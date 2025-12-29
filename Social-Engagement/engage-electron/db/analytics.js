const { getDatabase } = require('./index');

function getVolumeStats(options = {}) {
  const db = getDatabase();
  const { groupBy = 'day', range = 30 } = options;

  let dateFormat;
  switch (groupBy) {
    case 'week':
      dateFormat = '%Y-%W';
      break;
    case 'month':
      dateFormat = '%Y-%m';
      break;
    default:
      dateFormat = '%Y-%m-%d';
  }

  const ingestionStats = db.prepare(`
    SELECT
      strftime('${dateFormat}', ingested_at) as period,
      SUM(post_count) as posts_ingested,
      COUNT(*) as batch_count
    FROM ingestion_batches
    WHERE ingested_at >= datetime('now', '-${range} days')
    GROUP BY period
    ORDER BY period DESC
  `).all();

  const completionStats = db.prepare(`
    SELECT
      strftime('${dateFormat}', performed_at) as period,
      COUNT(*) as completions
    FROM engagement_actions
    WHERE action_type = 'done'
    AND performed_at >= datetime('now', '-${range} days')
    GROUP BY period
    ORDER BY period DESC
  `).all();

  return {
    ingestionStats,
    completionStats,
    groupBy,
    range
  };
}

function getAuthorStats(options = {}) {
  const db = getDatabase();
  const { limit = 20 } = options;

  return db.prepare(`
    SELECT
      p.author_handle,
      p.author,
      COUNT(DISTINCT p.id) as total_posts,
      COUNT(DISTINCT CASE
        WHEN EXISTS (
          SELECT 1 FROM engagement_actions ea
          WHERE ea.post_id = p.id AND ea.action_type = 'done'
          AND NOT EXISTS (
            SELECT 1 FROM engagement_actions ea2
            WHERE ea2.post_id = p.id AND ea2.action_type = 'reset'
            AND ea2.performed_at > ea.performed_at
          )
        ) THEN p.id
      END) as completed_posts,
      ROUND(
        COUNT(DISTINCT CASE
          WHEN EXISTS (
            SELECT 1 FROM engagement_actions ea
            WHERE ea.post_id = p.id AND ea.action_type = 'done'
            AND NOT EXISTS (
              SELECT 1 FROM engagement_actions ea2
              WHERE ea2.post_id = p.id AND ea2.action_type = 'reset'
              AND ea2.performed_at > ea.performed_at
            )
          ) THEN p.id
        END) * 100.0 / NULLIF(COUNT(DISTINCT p.id), 0),
        2
      ) as completion_rate
    FROM posts p
    WHERE p.is_deleted = 0
    AND p.author_handle IS NOT NULL
    GROUP BY p.author_handle, p.author
    ORDER BY total_posts DESC
    LIMIT ?
  `).all(limit);
}

function getEfficiencyStats(options = {}) {
  const db = getDatabase();
  const { range = 30 } = options;

  const dailyStats = db.prepare(`
    SELECT
      date(p.first_seen_at) as day,
      COUNT(*) as ingested,
      COUNT(CASE
        WHEN EXISTS (
          SELECT 1 FROM engagement_actions ea
          WHERE ea.post_id = p.id AND ea.action_type = 'done'
          AND NOT EXISTS (
            SELECT 1 FROM engagement_actions ea2
            WHERE ea2.post_id = p.id AND ea2.action_type = 'reset'
            AND ea2.performed_at > ea.performed_at
          )
        ) THEN 1
      END) as completed,
      ROUND(
        COUNT(CASE
          WHEN EXISTS (
            SELECT 1 FROM engagement_actions ea
            WHERE ea.post_id = p.id AND ea.action_type = 'done'
            AND NOT EXISTS (
              SELECT 1 FROM engagement_actions ea2
              WHERE ea2.post_id = p.id AND ea2.action_type = 'reset'
              AND ea2.performed_at > ea.performed_at
            )
          ) THEN 1
        END) * 100.0 / NULLIF(COUNT(*), 0),
        2
      ) as completion_rate
    FROM posts p
    WHERE p.is_deleted = 0
    AND p.first_seen_at >= datetime('now', '-${range} days')
    GROUP BY day
    ORDER BY day DESC
  `).all();

  const totals = db.prepare(`
    SELECT
      COUNT(*) as total_posts,
      COUNT(CASE
        WHEN EXISTS (
          SELECT 1 FROM engagement_actions ea
          WHERE ea.post_id = p.id AND ea.action_type = 'done'
          AND NOT EXISTS (
            SELECT 1 FROM engagement_actions ea2
            WHERE ea2.post_id = p.id AND ea2.action_type = 'reset'
            AND ea2.performed_at > ea.performed_at
          )
        ) THEN 1
      END) as total_completed
    FROM posts p
    WHERE p.is_deleted = 0
  `).get();

  return {
    dailyStats,
    totals: {
      ...totals,
      completion_rate: totals.total_posts > 0
        ? Math.round(totals.total_completed * 1000 / totals.total_posts) / 10
        : 0
    },
    range
  };
}

function getTimePatterns() {
  const db = getDatabase();

  const hourlyPattern = db.prepare(`
    SELECT
      strftime('%H', performed_at) as hour_of_day,
      COUNT(*) as completions
    FROM engagement_actions
    WHERE action_type = 'done'
    GROUP BY hour_of_day
    ORDER BY completions DESC
  `).all();

  const dayOfWeekPattern = db.prepare(`
    SELECT
      strftime('%w', performed_at) as day_of_week,
      COUNT(*) as completions
    FROM engagement_actions
    WHERE action_type = 'done'
    GROUP BY day_of_week
    ORDER BY completions DESC
  `).all();

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekPatternNamed = dayOfWeekPattern.map(row => ({
    ...row,
    day_name: dayNames[parseInt(row.day_of_week, 10)]
  }));

  return {
    hourlyPattern,
    dayOfWeekPattern: dayOfWeekPatternNamed
  };
}

function getAnalytics(options = {}) {
  const { type = 'all' } = options;

  const result = {};

  if (type === 'all' || type === 'volume') {
    result.volume = getVolumeStats(options);
  }

  if (type === 'all' || type === 'authors') {
    result.authors = getAuthorStats(options);
  }

  if (type === 'all' || type === 'efficiency') {
    result.efficiency = getEfficiencyStats(options);
  }

  if (type === 'all' || type === 'patterns') {
    result.patterns = getTimePatterns();
  }

  return result;
}

function getBatchHistory(options = {}) {
  const db = getDatabase();
  const { limit = 50 } = options;

  return db.prepare(`
    SELECT
      id,
      source_type,
      source_name,
      post_count,
      ingested_at
    FROM ingestion_batches
    ORDER BY ingested_at DESC
    LIMIT ?
  `).all(limit);
}

module.exports = {
  getVolumeStats,
  getAuthorStats,
  getEfficiencyStats,
  getTimePatterns,
  getAnalytics,
  getBatchHistory
};
