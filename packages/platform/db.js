import pg from 'pg';

function positiveInteger(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${name} must be a positive integer`);
  return value;
}

export function createDatabase(connectionString = process.env.DATABASE_URL) {
  if (!connectionString) throw new Error('DATABASE_URL is required');
  const pool = new pg.Pool({
    connectionString,
    max: positiveInteger('PG_POOL_MAX', 10),
    connectionTimeoutMillis: positiveInteger('PG_CONNECT_TIMEOUT_MS', 3_000),
    idleTimeoutMillis: 30_000
  });
  pool.on('error', (error) => {
    process.stderr.write(`${JSON.stringify({ level: 'error', source: 'postgres_pool', code: error.code ?? 'UNKNOWN' })}\n`);
  });
  return pool;
}
