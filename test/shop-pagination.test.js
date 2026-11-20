import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createDatabase } from '@chonguon/platform/db';
import { getShopsForAdmin } from '../apps/backend/src/modules/shops/service.js';

test('admin shop queue pages without repeating or skipping seeded shops', async () => {
  if (!process.env.TEST_DATABASE_URL) throw new Error('TEST_DATABASE_URL is required');
  const db = createDatabase(process.env.TEST_DATABASE_URL);
  const userIds = [];
  const shopIds = [];
  try {
    for (let index = 0; index < 30; index++) {
      const userId = randomUUID();
      const shopId = randomUUID();
      userIds.push(userId);
      shopIds.push(shopId);
      await db.query('INSERT INTO users (id, email, password_hash, role) VALUES ($1,$2,$3,$4)', [userId, `page-${userId}@example.test`, 'test-only', 'shop_owner']);
      await db.query('INSERT INTO shops (id, owner_user_id, name, representative, phone, address, sales_channel) VALUES ($1,$2,$3,$4,$5,$6,$7)', [shopId, userId, `Page shop ${index}`, 'Test', '0900000000', 'Hà Nội', 'Cửa hàng']);
    }
    const actor = { role: 'admin' };
    const seen = [];
    let cursor;
    do {
      const page = await getShopsForAdmin(db, actor, cursor);
      assert.ok(page.shops.length <= 25);
      seen.push(...page.shops.map((shop) => shop.id));
      cursor = page.nextCursor;
    } while (cursor);
    assert.equal(new Set(seen).size, seen.length);
    for (const id of shopIds) assert.ok(seen.includes(id));
    assert.equal((await getShopsForAdmin(db, actor, 'invalid!')).status, 400);
  } finally {
    await db.query('DELETE FROM shops WHERE id = ANY($1::uuid[])', [shopIds]);
    await db.query('DELETE FROM users WHERE id = ANY($1::uuid[])', [userIds]);
    await db.end();
  }
});
