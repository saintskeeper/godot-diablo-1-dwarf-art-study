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
  {
    id: 1,
    name: 'add_my_content_tables',
    up: (db) => db.exec(`
      -- Daily feedback reports (one per JSON import)
      CREATE TABLE IF NOT EXISTS feedback_reports (
        id TEXT PRIMARY KEY,
        report_date TEXT UNIQUE NOT NULL,
        posts_analyzed INTEGER,
        avg_score REAL,
        best_performing_post_url TEXT,
        biggest_gap TEXT,
        doing_well TEXT,
        experiment_suggestion TEXT,
        raw_data TEXT,
        ingested_at TEXT DEFAULT (datetime('now'))
      );

      -- My own posts with scores
      CREATE TABLE IF NOT EXISTS my_posts (
        id TEXT PRIMARY KEY,
        post_url TEXT UNIQUE NOT NULL,
        post_text TEXT,
        media_type TEXT,
        posted_at TEXT,
        likes INTEGER DEFAULT 0,
        retweets INTEGER DEFAULT 0,
        replies INTEGER DEFAULT 0,
        score_hook REAL,
        score_visual_impact REAL,
        score_structure REAL,
        score_engagement_hook REAL,
        score_discoverability REAL,
        score_storytelling REAL,
        overall_score REAL,
        strengths TEXT,
        weaknesses TEXT,
        quick_wins TEXT,
        rewrite_suggestion TEXT,
        first_seen_at TEXT DEFAULT (datetime('now')),
        last_updated_at TEXT DEFAULT (datetime('now')),
        report_id TEXT,
        FOREIGN KEY (report_id) REFERENCES feedback_reports(id)
      );

      -- Score history (track changes over time for same post)
      CREATE TABLE IF NOT EXISTS my_post_score_history (
        id TEXT PRIMARY KEY,
        my_post_id TEXT NOT NULL,
        report_id TEXT NOT NULL,
        overall_score REAL,
        score_hook REAL,
        score_visual_impact REAL,
        score_structure REAL,
        score_engagement_hook REAL,
        score_discoverability REAL,
        score_storytelling REAL,
        recorded_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (my_post_id) REFERENCES my_posts(id),
        FOREIGN KEY (report_id) REFERENCES feedback_reports(id)
      );

      -- Benchmark posts from others (high performers)
      CREATE TABLE IF NOT EXISTS benchmark_posts (
        id TEXT PRIMARY KEY,
        post_url TEXT NOT NULL,
        author TEXT,
        likes INTEGER,
        why_it_worked TEXT,
        steal_this TEXT,
        report_id TEXT NOT NULL,
        first_seen_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (report_id) REFERENCES feedback_reports(id)
      );

      -- Pattern reports (daily trends)
      CREATE TABLE IF NOT EXISTS pattern_reports (
        id TEXT PRIMARY KEY,
        report_id TEXT UNIQUE NOT NULL,
        winning_formats TEXT,
        trending_topics TEXT,
        hot_tools_mentioned TEXT,
        optimal_posting_times TEXT,
        avg_viral_post_length INTEGER,
        hashtag_most_effective TEXT,
        hashtag_overused_avoid TEXT,
        hashtag_emerging TEXT,
        FOREIGN KEY (report_id) REFERENCES feedback_reports(id)
      );

      -- Action items with tracking
      CREATE TABLE IF NOT EXISTS action_items (
        id TEXT PRIMARY KEY,
        report_id TEXT NOT NULL,
        priority INTEGER,
        category TEXT,
        recommendation TEXT,
        example TEXT,
        expected_impact TEXT,
        status TEXT DEFAULT 'pending',
        completed_at TEXT,
        FOREIGN KEY (report_id) REFERENCES feedback_reports(id)
      );

      -- Indexes for common queries
      CREATE INDEX IF NOT EXISTS idx_my_posts_url ON my_posts(post_url);
      CREATE INDEX IF NOT EXISTS idx_my_posts_posted_at ON my_posts(posted_at);
      CREATE INDEX IF NOT EXISTS idx_my_posts_overall_score ON my_posts(overall_score);
      CREATE INDEX IF NOT EXISTS idx_my_posts_report ON my_posts(report_id);
      CREATE INDEX IF NOT EXISTS idx_feedback_reports_date ON feedback_reports(report_date);
      CREATE INDEX IF NOT EXISTS idx_score_history_post ON my_post_score_history(my_post_id);
      CREATE INDEX IF NOT EXISTS idx_action_items_status ON action_items(status);
      CREATE INDEX IF NOT EXISTS idx_action_items_report ON action_items(report_id);
      CREATE INDEX IF NOT EXISTS idx_benchmark_posts_report ON benchmark_posts(report_id);
    `)
  }
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
