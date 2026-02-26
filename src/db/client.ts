import Database from "better-sqlite3";
import path from "path";
import os from "os";
import { runMigrations } from "./migrations.js";

const DB_PATH = process.env.DEV_JOURNAL_DB_PATH ?? path.join(os.homedir(), ".dev-journal.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL"); // Better concurrent read performance
    runMigrations(_db);
  }
  return _db;
}