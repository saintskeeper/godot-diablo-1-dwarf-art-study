const { getDatabase } = require('./index');
const crypto = require('crypto');

function generateUUID() {
  return crypto.randomUUID();
}

function saveFeedbackReport(jsonData) {
  const db = getDatabase();
  const reportId = generateUUID();
  const reportDate = jsonData.analysis_date || new Date().toISOString().split('T')[0];

  const transaction = db.transaction(() => {
    // Check if report for this date already exists
    const existingReport = db.prepare(
      'SELECT id FROM feedback_reports WHERE report_date = ?'
    ).get(reportDate);

    const finalReportId = existingReport ? existingReport.id : reportId;

    // Upsert feedback_report
    db.prepare(`
      INSERT INTO feedback_reports (id, report_date, posts_analyzed, avg_score,
        best_performing_post_url, biggest_gap, doing_well, experiment_suggestion, raw_data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(report_date) DO UPDATE SET
        posts_analyzed = excluded.posts_analyzed,
        avg_score = excluded.avg_score,
        best_performing_post_url = excluded.best_performing_post_url,
        biggest_gap = excluded.biggest_gap,
        doing_well = excluded.doing_well,
        experiment_suggestion = excluded.experiment_suggestion,
        raw_data = excluded.raw_data,
        ingested_at = datetime('now')
    `).run(
      finalReportId,
      reportDate,
      jsonData.walter_summary?.posts_analyzed || 0,
      jsonData.walter_summary?.avg_score || null,
      jsonData.walter_summary?.best_performing_post || null,
      jsonData.walter_summary?.biggest_gap || null,
      jsonData.walter_summary?.doing_well || null,
      jsonData.experiment_suggestion?.what || JSON.stringify(jsonData.experiment_suggestion) || null,
      JSON.stringify(jsonData)
    );

    // Process walter_posts_reviewed
    let postsProcessed = 0;
    for (const post of jsonData.walter_posts_reviewed || []) {
      const postId = saveOrUpdateMyPost(db, post, finalReportId);
      recordScoreHistory(db, postId, finalReportId, post);
      postsProcessed++;
    }

    // Clear and save benchmark_highlights for this report
    db.prepare('DELETE FROM benchmark_posts WHERE report_id = ?').run(finalReportId);
    for (const benchmark of jsonData.benchmark_highlights || []) {
      saveBenchmarkPost(db, benchmark, finalReportId);
    }

    // Save pattern_report
    if (jsonData.pattern_report) {
      savePatternReport(db, jsonData.pattern_report, finalReportId);
    }

    // Clear and save action_items for this report
    db.prepare('DELETE FROM action_items WHERE report_id = ?').run(finalReportId);
    for (const item of jsonData.action_items || []) {
      saveActionItem(db, item, finalReportId);
    }

    return {
      success: true,
      reportId: finalReportId,
      reportDate,
      postsProcessed,
      isUpdate: !!existingReport
    };
  });

  return transaction();
}

function saveOrUpdateMyPost(db, post, reportId) {
  const existingPost = db.prepare(
    'SELECT id FROM my_posts WHERE post_url = ?'
  ).get(post.post_url);

  const postId = existingPost ? existingPost.id : generateUUID();
  const scores = post.scores || {};

  db.prepare(`
    INSERT INTO my_posts (id, post_url, post_text, media_type, posted_at,
      likes, retweets, replies, score_hook, score_visual_impact, score_structure,
      score_engagement_hook, score_discoverability, score_storytelling, overall_score,
      strengths, weaknesses, quick_wins, rewrite_suggestion, report_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(post_url) DO UPDATE SET
      post_text = excluded.post_text,
      media_type = excluded.media_type,
      likes = excluded.likes,
      retweets = excluded.retweets,
      replies = excluded.replies,
      score_hook = excluded.score_hook,
      score_visual_impact = excluded.score_visual_impact,
      score_structure = excluded.score_structure,
      score_engagement_hook = excluded.score_engagement_hook,
      score_discoverability = excluded.score_discoverability,
      score_storytelling = excluded.score_storytelling,
      overall_score = excluded.overall_score,
      strengths = excluded.strengths,
      weaknesses = excluded.weaknesses,
      quick_wins = excluded.quick_wins,
      rewrite_suggestion = excluded.rewrite_suggestion,
      report_id = excluded.report_id,
      last_updated_at = datetime('now')
  `).run(
    postId,
    post.post_url,
    post.post_text || null,
    post.media_type || null,
    post.posted_at || null,
    post.likes || 0,
    post.retweets || 0,
    post.replies || 0,
    scores.hook || null,
    scores.visual_impact || null,
    scores.structure || null,
    scores.engagement_hook || null,
    scores.discoverability || null,
    scores.storytelling || null,
    post.overall_score || null,
    JSON.stringify(post.strengths || []),
    JSON.stringify(post.weaknesses || []),
    JSON.stringify(post.quick_wins || []),
    post.rewrite_suggestion || null,
    reportId
  );

  return postId;
}

function recordScoreHistory(db, myPostId, reportId, post) {
  const scores = post.scores || {};
  const id = generateUUID();

  db.prepare(`
    INSERT INTO my_post_score_history (id, my_post_id, report_id, overall_score,
      score_hook, score_visual_impact, score_structure, score_engagement_hook,
      score_discoverability, score_storytelling)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    myPostId,
    reportId,
    post.overall_score || null,
    scores.hook || null,
    scores.visual_impact || null,
    scores.structure || null,
    scores.engagement_hook || null,
    scores.discoverability || null,
    scores.storytelling || null
  );
}

function saveBenchmarkPost(db, benchmark, reportId) {
  const id = generateUUID();

  db.prepare(`
    INSERT INTO benchmark_posts (id, post_url, author, likes, why_it_worked, steal_this, report_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    benchmark.post_url,
    benchmark.author || null,
    benchmark.likes || 0,
    benchmark.why_it_worked || null,
    benchmark.steal_this || null,
    reportId
  );
}

function savePatternReport(db, pattern, reportId) {
  db.prepare(`
    INSERT INTO pattern_reports (id, report_id, winning_formats, trending_topics,
      hot_tools_mentioned, optimal_posting_times, avg_viral_post_length,
      hashtag_most_effective, hashtag_overused_avoid, hashtag_emerging)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(report_id) DO UPDATE SET
      winning_formats = excluded.winning_formats,
      trending_topics = excluded.trending_topics,
      hot_tools_mentioned = excluded.hot_tools_mentioned,
      optimal_posting_times = excluded.optimal_posting_times,
      avg_viral_post_length = excluded.avg_viral_post_length,
      hashtag_most_effective = excluded.hashtag_most_effective,
      hashtag_overused_avoid = excluded.hashtag_overused_avoid,
      hashtag_emerging = excluded.hashtag_emerging
  `).run(
    generateUUID(),
    reportId,
    JSON.stringify(pattern.winning_formats_today || []),
    JSON.stringify(pattern.trending_topics || []),
    JSON.stringify(pattern.hot_tools_mentioned || []),
    JSON.stringify(pattern.optimal_posting_times || []),
    pattern.avg_viral_post_length || null,
    JSON.stringify(pattern.hashtag_insights?.most_effective || []),
    JSON.stringify(pattern.hashtag_insights?.overused_avoid || []),
    JSON.stringify(pattern.hashtag_insights?.emerging || [])
  );
}

function saveActionItem(db, item, reportId) {
  const id = generateUUID();

  db.prepare(`
    INSERT INTO action_items (id, report_id, priority, category, recommendation, example, expected_impact)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    reportId,
    item.priority || 99,
    item.category || null,
    item.recommendation || null,
    item.example || null,
    item.expected_impact || null
  );
}

function getMyPosts(options = {}) {
  const db = getDatabase();
  const { limit = 100, offset = 0, sortBy = 'posted_at', sortOrder = 'DESC', mediaType } = options;

  const validSortColumns = ['posted_at', 'overall_score', 'likes', 'first_seen_at'];
  const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'posted_at';
  const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  let query = 'SELECT * FROM my_posts WHERE 1=1';
  const params = [];

  if (mediaType) {
    query += ' AND media_type = ?';
    params.push(mediaType);
  }

  query += ` ORDER BY ${sortColumn} ${order} LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return db.prepare(query).all(...params);
}

function getMyPost(identifier) {
  const db = getDatabase();

  if (identifier.id) {
    return db.prepare('SELECT * FROM my_posts WHERE id = ?').get(identifier.id);
  }
  if (identifier.url) {
    return db.prepare('SELECT * FROM my_posts WHERE post_url = ?').get(identifier.url);
  }
  return null;
}

function getMyContentAnalytics(options = {}) {
  const db = getDatabase();
  const { range = 30 } = options;

  // Overall stats
  const totals = db.prepare(`
    SELECT
      COUNT(*) as total_posts,
      AVG(overall_score) as avg_overall,
      AVG(score_hook) as avg_hook,
      AVG(score_visual_impact) as avg_visual,
      AVG(score_structure) as avg_structure,
      AVG(score_engagement_hook) as avg_engagement,
      AVG(score_discoverability) as avg_discovery,
      AVG(score_storytelling) as avg_story,
      MAX(overall_score) as max_score,
      MIN(overall_score) as min_score,
      SUM(likes) as total_likes,
      SUM(retweets) as total_retweets,
      SUM(replies) as total_replies
    FROM my_posts
    WHERE first_seen_at >= datetime('now', '-' || ? || ' days')
  `).get(range);

  // Previous period for trend comparison
  const previousPeriod = db.prepare(`
    SELECT AVG(overall_score) as avg_overall
    FROM my_posts
    WHERE first_seen_at >= datetime('now', '-' || ? || ' days')
    AND first_seen_at < datetime('now', '-' || ? || ' days')
  `).get(range * 2, range);

  // Top performers
  const topPosts = db.prepare(`
    SELECT *
    FROM my_posts
    WHERE first_seen_at >= datetime('now', '-' || ? || ' days')
    ORDER BY overall_score DESC
    LIMIT 5
  `).all(range);

  // By media type
  const byMediaType = db.prepare(`
    SELECT
      media_type,
      COUNT(*) as count,
      AVG(overall_score) as avg_score
    FROM my_posts
    WHERE first_seen_at >= datetime('now', '-' || ? || ' days')
    AND media_type IS NOT NULL
    GROUP BY media_type
  `).all(range);

  // Latest report info
  const latestReport = db.prepare(`
    SELECT experiment_suggestion, biggest_gap, doing_well, report_date
    FROM feedback_reports
    ORDER BY report_date DESC
    LIMIT 1
  `).get();

  // Calculate trend
  let trend = null;
  if (previousPeriod?.avg_overall && totals?.avg_overall) {
    trend = ((totals.avg_overall - previousPeriod.avg_overall) / previousPeriod.avg_overall * 100).toFixed(1);
  }

  return {
    totals,
    avgScores: {
      hook: totals?.avg_hook || 0,
      visual_impact: totals?.avg_visual || 0,
      structure: totals?.avg_structure || 0,
      engagement_hook: totals?.avg_engagement || 0,
      discoverability: totals?.avg_discovery || 0,
      storytelling: totals?.avg_story || 0
    },
    trend,
    topPosts,
    byMediaType,
    latestExperiment: latestReport?.experiment_suggestion,
    biggestGap: latestReport?.biggest_gap,
    doingWell: latestReport?.doing_well,
    latestReportDate: latestReport?.report_date
  };
}

function getScoreTrends(range = 30) {
  const db = getDatabase();

  return db.prepare(`
    SELECT
      fr.report_date,
      fr.avg_score,
      fr.posts_analyzed
    FROM feedback_reports fr
    WHERE fr.report_date >= date('now', '-' || ? || ' days')
    ORDER BY fr.report_date ASC
  `).all(range);
}

function getScoreHistory(postId) {
  const db = getDatabase();

  return db.prepare(`
    SELECT h.*, fr.report_date
    FROM my_post_score_history h
    JOIN feedback_reports fr ON h.report_id = fr.id
    WHERE h.my_post_id = ?
    ORDER BY fr.report_date ASC
  `).all(postId);
}

function getWeakestAreas() {
  const db = getDatabase();

  return db.prepare(`
    SELECT 'hook' as category, AVG(score_hook) as avg_score FROM my_posts WHERE score_hook IS NOT NULL
    UNION ALL
    SELECT 'visual_impact', AVG(score_visual_impact) FROM my_posts WHERE score_visual_impact IS NOT NULL
    UNION ALL
    SELECT 'structure', AVG(score_structure) FROM my_posts WHERE score_structure IS NOT NULL
    UNION ALL
    SELECT 'engagement_hook', AVG(score_engagement_hook) FROM my_posts WHERE score_engagement_hook IS NOT NULL
    UNION ALL
    SELECT 'discoverability', AVG(score_discoverability) FROM my_posts WHERE score_discoverability IS NOT NULL
    UNION ALL
    SELECT 'storytelling', AVG(score_storytelling) FROM my_posts WHERE score_storytelling IS NOT NULL
    ORDER BY avg_score ASC
  `).all();
}

function getTopPerformers(limit = 5) {
  const db = getDatabase();

  return db.prepare(`
    SELECT * FROM my_posts
    ORDER BY overall_score DESC
    LIMIT ?
  `).all(limit);
}

function getActionItems(options = {}) {
  const db = getDatabase();
  const { status, limit = 50 } = options;

  let query = `
    SELECT ai.*, fr.report_date
    FROM action_items ai
    JOIN feedback_reports fr ON ai.report_id = fr.id
  `;

  const params = [];

  if (status) {
    query += ' WHERE ai.status = ?';
    params.push(status);
  }

  query += ' ORDER BY fr.report_date DESC, ai.priority ASC LIMIT ?';
  params.push(limit);

  return db.prepare(query).all(...params);
}

function updateActionItemStatus(id, status) {
  const db = getDatabase();

  const completedAt = status === 'completed' ? "datetime('now')" : 'NULL';

  db.prepare(`
    UPDATE action_items
    SET status = ?, completed_at = ${completedAt}
    WHERE id = ?
  `).run(status, id);

  return { success: true };
}

function getBenchmarkPosts(options = {}) {
  const db = getDatabase();
  const { limit = 10 } = options;

  return db.prepare(`
    SELECT bp.*, fr.report_date
    FROM benchmark_posts bp
    JOIN feedback_reports fr ON bp.report_id = fr.id
    ORDER BY fr.report_date DESC, bp.likes DESC
    LIMIT ?
  `).all(limit);
}

function getPatternReport(reportId) {
  const db = getDatabase();

  if (reportId) {
    return db.prepare('SELECT * FROM pattern_reports WHERE report_id = ?').get(reportId);
  }

  // Get latest
  return db.prepare(`
    SELECT pr.*, fr.report_date
    FROM pattern_reports pr
    JOIN feedback_reports fr ON pr.report_id = fr.id
    ORDER BY fr.report_date DESC
    LIMIT 1
  `).get();
}

function getFeedbackReports(options = {}) {
  const db = getDatabase();
  const { limit = 30 } = options;

  return db.prepare(`
    SELECT * FROM feedback_reports
    ORDER BY report_date DESC
    LIMIT ?
  `).all(limit);
}

function getLatestReport() {
  const db = getDatabase();

  return db.prepare(`
    SELECT * FROM feedback_reports
    ORDER BY report_date DESC
    LIMIT 1
  `).get();
}

module.exports = {
  saveFeedbackReport,
  getMyPosts,
  getMyPost,
  getMyContentAnalytics,
  getScoreTrends,
  getScoreHistory,
  getWeakestAreas,
  getTopPerformers,
  getActionItems,
  updateActionItemStatus,
  getBenchmarkPosts,
  getPatternReport,
  getFeedbackReports,
  getLatestReport
};
