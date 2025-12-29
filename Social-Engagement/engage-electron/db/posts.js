const { getDatabase } = require('./index');
const crypto = require('crypto');

function generateUUID() {
  return crypto.randomUUID();
}

function createBatch(sourceType, sourceName = null) {
  const db = getDatabase();
  const id = generateUUID();

  db.prepare(`
    INSERT INTO ingestion_batches (id, source_type, source_name, post_count)
    VALUES (?, ?, ?, 0)
  `).run(id, sourceType, sourceName);

  return id;
}

function updateBatchCount(batchId, count) {
  const db = getDatabase();
  db.prepare(`
    UPDATE ingestion_batches SET post_count = ? WHERE id = ?
  `).run(count, batchId);
}

function savePosts(posts, sourceType = 'paste', sourceName = null) {
  const db = getDatabase();
  const batchId = createBatch(sourceType, sourceName);

  const insertStmt = db.prepare(`
    INSERT INTO posts (id, url, author, author_handle, followers, summary, description,
                       suggested_comment, likes, retweets, comments, batch_id, raw_data)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(url) DO UPDATE SET
      likes = excluded.likes,
      retweets = excluded.retweets,
      comments = excluded.comments,
      suggested_comment = COALESCE(excluded.suggested_comment, posts.suggested_comment),
      last_updated_at = datetime('now')
  `);

  const selectStmt = db.prepare('SELECT * FROM posts WHERE url = ?');

  let savedCount = 0;
  let duplicateCount = 0;
  const resultPosts = [];

  const transaction = db.transaction((postsToSave) => {
    for (const post of postsToSave) {
      const existingPost = selectStmt.get(post.url);
      const isNew = !existingPost;

      const handle = post.author?.replace(/^@/, '').toLowerCase() || null;
      const id = isNew ? generateUUID() : existingPost.id;

      insertStmt.run(
        id,
        post.url,
        post.author || null,
        handle,
        post.followers || null,
        post.summary || null,
        post.description || null,
        post.suggested_comment || null,
        String(post.likes || ''),
        String(post.retweets || ''),
        String(post.comments || ''),
        batchId,
        JSON.stringify(post)
      );

      if (isNew) {
        savedCount++;
      } else {
        duplicateCount++;
      }

      const savedPost = selectStmt.get(post.url);
      resultPosts.push(savedPost);
    }
  });

  transaction(posts);
  updateBatchCount(batchId, savedCount);

  return {
    success: true,
    savedCount,
    duplicateCount,
    batchId,
    posts: resultPosts
  };
}

function queryPosts(filters = {}) {
  const db = getDatabase();
  const { status, limit = 100, offset = 0, batchId } = filters;

  let query = `
    SELECT p.*,
      CASE WHEN EXISTS (
        SELECT 1 FROM engagement_actions ea
        WHERE ea.post_id = p.id AND ea.action_type = 'done'
        AND NOT EXISTS (
          SELECT 1 FROM engagement_actions ea2
          WHERE ea2.post_id = p.id AND ea2.action_type = 'reset'
          AND ea2.performed_at > ea.performed_at
        )
      ) THEN 1 ELSE 0 END as is_done
    FROM posts p
    WHERE p.is_deleted = 0
  `;

  const params = [];

  if (batchId) {
    query += ' AND p.batch_id = ?';
    params.push(batchId);
  }

  if (status === 'done') {
    query += ` AND EXISTS (
      SELECT 1 FROM engagement_actions ea
      WHERE ea.post_id = p.id AND ea.action_type = 'done'
      AND NOT EXISTS (
        SELECT 1 FROM engagement_actions ea2
        WHERE ea2.post_id = p.id AND ea2.action_type = 'reset'
        AND ea2.performed_at > ea.performed_at
      )
    )`;
  } else if (status === 'pending') {
    query += ` AND NOT EXISTS (
      SELECT 1 FROM engagement_actions ea
      WHERE ea.post_id = p.id AND ea.action_type = 'done'
      AND NOT EXISTS (
        SELECT 1 FROM engagement_actions ea2
        WHERE ea2.post_id = p.id AND ea2.action_type = 'reset'
        AND ea2.performed_at > ea.performed_at
      )
    )`;
  }

  query += ' ORDER BY p.first_seen_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  return db.prepare(query).all(...params);
}

function getPost(identifier) {
  const db = getDatabase();

  if (identifier.id) {
    return db.prepare('SELECT * FROM posts WHERE id = ? AND is_deleted = 0').get(identifier.id);
  }
  if (identifier.url) {
    return db.prepare('SELECT * FROM posts WHERE url = ? AND is_deleted = 0').get(identifier.url);
  }
  return null;
}

function markDone(postId, done) {
  const db = getDatabase();
  const actionType = done ? 'done' : 'reset';
  const id = generateUUID();

  db.prepare(`
    INSERT INTO engagement_actions (id, post_id, action_type)
    VALUES (?, ?, ?)
  `).run(id, postId, actionType);

  return { success: true };
}

function getDoneUrls() {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT p.url FROM posts p
    WHERE p.is_deleted = 0
    AND EXISTS (
      SELECT 1 FROM engagement_actions ea
      WHERE ea.post_id = p.id AND ea.action_type = 'done'
      AND NOT EXISTS (
        SELECT 1 FROM engagement_actions ea2
        WHERE ea2.post_id = p.id AND ea2.action_type = 'reset'
        AND ea2.performed_at > ea.performed_at
      )
    )
  `).all();

  return rows.map(row => row.url);
}

function migrateFromLocalStorage(doneUrls) {
  const db = getDatabase();
  let migratedCount = 0;

  const batchId = createBatch('migration', 'localStorage migration');

  const insertPost = db.prepare(`
    INSERT OR IGNORE INTO posts (id, url, author, batch_id)
    VALUES (?, ?, 'Unknown (migrated)', ?)
  `);

  const selectPost = db.prepare('SELECT id FROM posts WHERE url = ?');

  const insertAction = db.prepare(`
    INSERT INTO engagement_actions (id, post_id, action_type)
    VALUES (?, ?, 'done')
  `);

  const transaction = db.transaction((urls) => {
    for (const url of urls) {
      let post = selectPost.get(url);

      if (!post) {
        const postId = generateUUID();
        insertPost.run(postId, url, batchId);
        post = { id: postId };
      }

      insertAction.run(generateUUID(), post.id);
      migratedCount++;
    }
  });

  transaction(doneUrls);
  updateBatchCount(batchId, migratedCount);

  return { success: true, migratedCount };
}

function deletePost(postId) {
  const db = getDatabase();
  db.prepare(`
    UPDATE posts SET is_deleted = 1, last_updated_at = datetime('now')
    WHERE id = ?
  `).run(postId);
  return { success: true };
}

module.exports = {
  generateUUID,
  savePosts,
  queryPosts,
  getPost,
  markDone,
  getDoneUrls,
  migrateFromLocalStorage,
  deletePost,
  createBatch
};
