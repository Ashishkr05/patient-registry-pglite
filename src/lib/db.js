import { PGlite } from '@electric-sql/pglite';

let db;
let dbReady = false;

export async function getDB() {
  if (dbReady) return db;

 db = new PGlite('idb://patient-db', { sharedWorker: true });

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

  dbReady = true;
  return db;
}
