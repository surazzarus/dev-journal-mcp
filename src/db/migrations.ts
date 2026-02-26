import type Database from "better-sqlite3";

// Add new migrations here — never edit existing ones
const MIGRATIONS: { version: number; sql: string }[] = [
  {
    version: 1,
    sql: `
      CREATE TABLE IF NOT EXISTS entries (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        date        TEXT NOT NULL,
        project     TEXT,
        category    TEXT NOT NULL DEFAULT 'other',
        note        TEXT NOT NULL,
        created_at  TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE INDEX IF NOT EXISTS idx_entries_date ON entries(date);
      CREATE INDEX IF NOT EXISTS idx_entries_project ON entries(project);
    `,
  },
  // Future example:
  // {
  //   version: 2,
  //   sql: `ALTER TABLE entries ADD COLUMN tags TEXT;`
  // },
];

export function runMigrations(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      version    INTEGER PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  const applied = new Set(
    (db.prepare("SELECT version FROM migrations").all() as { version: number }[]).map(r => r.version)
  );

  for (const { version, sql } of MIGRATIONS) {
    if (applied.has(version)) continue;
    db.exec(sql);
    db.prepare("INSERT INTO migrations (version) VALUES (?)").run(version);
    console.error(`[dev-journal] Applied migration v${version}`);
  }
}