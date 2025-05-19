// src/lib/db.js
import { PGlite } from '@electric-sql/pglite';

let db;

export async function getDB() {
  if (db) return db;

  db = new PGlite('patient-db', { persistent: true });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      contact TEXT,
      address TEXT
    );
  `);

  return db;
}
