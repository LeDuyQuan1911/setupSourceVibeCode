import { randomUUID } from 'node:crypto';
import { createDatabase } from '@chonguon/platform/db';
import { hashPassword } from '../apps/backend/src/core/password.js';

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!email || !password || password.length < 12 || password === 'replace-with-a-long-password') {
  throw new Error('Set ADMIN_EMAIL and a unique ADMIN_PASSWORD with at least 12 characters');
}
const db = createDatabase();
try {
  await db.query('INSERT INTO users (id, email, password_hash, role) VALUES ($1, $2, $3, $4)', [randomUUID(), email, await hashPassword(password), 'admin']);
  process.stdout.write('Admin created\n');
} finally {
  await db.end();
}
