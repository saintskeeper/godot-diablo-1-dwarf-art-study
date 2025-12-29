function createTables(db) {
  db.exec(`
    -- Posts (de-duplicated by URL, UUID primary key)
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      url TEXT UNIQUE NOT NULL,
      author TEXT,
      author_handle TEXT,
      followers TEXT,
      summary TEXT,
      description TEXT,
      suggested_comment TEXT,
      likes TEXT,
      retweets TEXT,
      comments TEXT,
      batch_id TEXT,
      first_seen_at TEXT DEFAULT (datetime('now')),
      last_updated_at TEXT DEFAULT (datetime('now')),
      is_deleted INTEGER DEFAULT 0,
      raw_data TEXT,
      FOREIGN KEY (batch_id) REFERENCES ingestion_batches(id)
    );

    -- Ingestion batches
    CREATE TABLE IF NOT EXISTS ingestion_batches (
      id TEXT PRIMARY KEY,
      source_type TEXT NOT NULL,
      source_name TEXT,
      post_count INTEGER DEFAULT 0,
      ingested_at TEXT DEFAULT (datetime('now'))
    );

    -- Engagement actions (done, skipped, reset)
    CREATE TABLE IF NOT EXISTS engagement_actions (
      id TEXT PRIMARY KEY,
      post_id TEXT NOT NULL,
      action_type TEXT NOT NULL,
      performed_at TEXT DEFAULT (datetime('now')),
      session_id TEXT,
      FOREIGN KEY (post_id) REFERENCES posts(id)
    );

    -- Custom lists
    CREATE TABLE IF NOT EXISTS lists (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      color TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- List membership (many-to-many)
    CREATE TABLE IF NOT EXISTS list_posts (
      list_id TEXT NOT NULL,
      post_id TEXT NOT NULL,
      added_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (list_id, post_id),
      FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

    -- Tags
    CREATE TABLE IF NOT EXISTS tags (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      color TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- Post tags (many-to-many)
    CREATE TABLE IF NOT EXISTS post_tags (
      post_id TEXT NOT NULL,
      tag_id TEXT NOT NULL,
      tagged_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (post_id, tag_id),
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );

    -- Work sessions
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      started_at TEXT DEFAULT (datetime('now')),
      ended_at TEXT,
      posts_completed INTEGER DEFAULT 0
    );

    -- Migrations tracking
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT DEFAULT (datetime('now'))
    );

    -- Indexes for common queries
    CREATE INDEX IF NOT EXISTS idx_posts_url ON posts(url);
    CREATE INDEX IF NOT EXISTS idx_posts_author_handle ON posts(author_handle);
    CREATE INDEX IF NOT EXISTS idx_posts_first_seen ON posts(first_seen_at);
    CREATE INDEX IF NOT EXISTS idx_posts_batch ON posts(batch_id);
    CREATE INDEX IF NOT EXISTS idx_actions_post ON engagement_actions(post_id);
    CREATE INDEX IF NOT EXISTS idx_actions_performed ON engagement_actions(performed_at);
    CREATE INDEX IF NOT EXISTS idx_actions_type ON engagement_actions(action_type);
    CREATE INDEX IF NOT EXISTS idx_batches_ingested ON ingestion_batches(ingested_at);
  `);
}

const MIGRATIONS = [
  // Future migrations go here
  // { id: 1, name: 'add_some_column', up: (db) => db.exec('ALTER TABLE...') }
];

function runMigrations(db) {
  const appliedMigrations = db.prepare(
    'SELECT id FROM migrations'
  ).all().map(row => row.id);

  for (const migration of MIGRATIONS) {
    if (!appliedMigrations.includes(migration.id)) {
      console.log(`Applying migration: ${migration.name}`);
      migration.up(db);
      db.prepare(
        'INSERT INTO migrations (id, name) VALUES (?, ?)'
      ).run(migration.id, migration.name);
    }
  }
}

module.exports = {
  createTables,
  runMigrations
};
