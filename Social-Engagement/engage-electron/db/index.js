const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');
const { createTables, runMigrations } = require('./schema');

let db = null;

function getDatabasePath() {
  return path.join(app.getPath('userData'), 'engage.sqlite');
}

function initDatabase() {
  if (db) return db;

  const dbPath = getDatabasePath();
  db = new Database(dbPath);

  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  createTables(db);
  runMigrations(db);

  console.log(`Database initialized at: ${dbPath}`);
  return db;
}

function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

function closeDatabase() {
  if (db) {
    db.close();
    db = null;
    console.log('Database connection closed');
  }
}

module.exports = {
  initDatabase,
  getDatabase,
  closeDatabase,
  getDatabasePath
};
