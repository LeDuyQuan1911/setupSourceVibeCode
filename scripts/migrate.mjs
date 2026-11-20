import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createDatabase } from '@chonguon/platform/db';

const db = createDatabase(process.argv.includes('--test') ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL);
const folder = resolve('db/migrations');
try {
  await db.query(`CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
  for (const name of (await readdir(folder)).filter((file) => file.endsWith('.sql')).sort()) {
    const done = await db.query('SELECT 1 FROM schema_migrations WHERE name = $1', [name]);
    if (done.rowCount) continue;
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      await client.query(await readFile(resolve(folder, name), 'utf8'));
      await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [name]);
      await client.query('COMMIT');
      process.stdout.write(`Applied ${name}\n`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
} finally {
  await db.end();
}
