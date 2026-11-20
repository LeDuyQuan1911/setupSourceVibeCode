import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import WebSocket from 'ws';
import { createDatabase } from '@chonguon/platform/db';
import { createSession } from '@chonguon/platform/session';
import { buildRealtimeApp } from '../apps/realtime/src/app.js';

async function connect(url, cookie, origin) {
  return new Promise((resolve, reject) => {
    const client = new WebSocket(url, { headers: { Cookie: cookie, Origin: origin } });
    client.once('message', (data) => {
      client.close();
      resolve(JSON.parse(data.toString()));
    });
    client.once('unexpected-response', (_request, response) => {
      const status = response.statusCode;
      response.resume();
      resolve(status);
    });
    client.once('error', reject);
  });
}

test('realtime accepts only approved shop sessions from the same origin', async () => {
  if (!process.env.TEST_DATABASE_URL) throw new Error('TEST_DATABASE_URL is required');
  const db = createDatabase(process.env.TEST_DATABASE_URL);
  const app = buildRealtimeApp(db);
  const userId = randomUUID();
  const shopId = randomUUID();
  let listening = false;
  try {
    await db.query('INSERT INTO users (id, email, password_hash, role) VALUES ($1,$2,$3,$4)', [userId, `ws-${userId}@example.test`, 'test-only', 'shop_owner']);
    await db.query('INSERT INTO shops (id, owner_user_id, name, representative, phone, address, sales_channel) VALUES ($1,$2,$3,$4,$5,$6,$7)', [shopId, userId, 'Test shop', 'Test', '0900000000', 'Hà Nội', 'Cửa hàng']);
    let cookie;
    await createSession(db, userId, { header: (_name, value) => { cookie = value.split(';')[0]; } });
    await new Promise((resolve) => app.server.listen(0, '127.0.0.1', resolve));
    listening = true;
    const port = app.server.address().port;
    const url = `ws://127.0.0.1:${port}/ws`;
    const origin = `http://127.0.0.1:${port}`;
    assert.equal(await connect(url, cookie, 'http://evil.example'), 403);
    assert.equal(await connect(url, cookie, origin), 401);
    await db.query("UPDATE shops SET status = 'approved' WHERE id = $1", [shopId]);
    assert.deepEqual(await connect(url, cookie, origin), { type: 'ready', userId });
  } finally {
    await db.query('DELETE FROM sessions WHERE user_id = $1', [userId]);
    await db.query('DELETE FROM shops WHERE id = $1', [shopId]);
    await db.query('DELETE FROM users WHERE id = $1', [userId]);
    if (listening) await app.close();
    else await db.end();
  }
});
