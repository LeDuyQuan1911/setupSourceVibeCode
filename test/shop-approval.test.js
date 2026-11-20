import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { buildApp } from '../apps/backend/src/app.js';
import { createDatabase } from '@chonguon/platform/db';
import { hashPassword } from '../apps/backend/src/core/password.js';

const origin = { origin: 'http://localhost:5173', host: 'localhost:5173' };

test('shop waits for approval and only admin can decide', async () => {
  if (!process.env.TEST_DATABASE_URL) throw new Error('TEST_DATABASE_URL is required');
  const db = createDatabase(process.env.TEST_DATABASE_URL);
  const cache = {
    invalidations: 0,
    async getOrLoad(_namespace, _key, _ttl, loader) { return loader(); },
    async invalidate() { this.invalidations++; },
    async close() {}
  };
  const app = buildApp(db, cache);
  const suffix = randomUUID();
  const adminEmail = `admin-${suffix}@example.test`;
  const shopEmail = `shop-${suffix}@example.test`;
  const adminId = randomUUID();
  let shopId;
  try {
    await db.query('INSERT INTO users (id, email, password_hash, role) VALUES ($1,$2,$3,$4)', [adminId, adminEmail, await hashPassword('admin-test-password-123'), 'admin']);
    const register = await app.inject({ method: 'POST', url: '/api/register', headers: origin, payload: {
      email: shopEmail, password: 'shop-test-password-123', shopName: 'Shop thử', representative: 'An',
      phone: '0900000000', address: 'Hà Nội', salesChannel: 'Cửa hàng'
    } });
    assert.equal(register.statusCode, 201);
    assert.equal(cache.invalidations, 1);
    const shopCookie = register.headers['set-cookie'].split(';')[0];
    const pending = await app.inject({ method: 'GET', url: '/api/me', headers: { cookie: shopCookie } });
    assert.equal(pending.json().user.shop_status, 'pending');
    shopId = pending.json().user.shop_id;
    const denied = await app.inject({ method: 'POST', url: `/api/admin/shops/${shopId}/decision`, headers: { ...origin, cookie: shopCookie }, payload: { decision: 'approved', note: '' } });
    assert.equal(denied.statusCode, 403);
    const login = await app.inject({ method: 'POST', url: '/api/login', headers: origin, payload: { email: adminEmail, password: 'admin-test-password-123' } });
    assert.equal(login.statusCode, 200);
    const adminCookie = login.headers['set-cookie'].split(';')[0];
    const approve = await app.inject({ method: 'POST', url: `/api/admin/shops/${shopId}/decision`, headers: { ...origin, cookie: adminCookie }, payload: { decision: 'approved', note: 'Đã kiểm tra' } });
    assert.equal(approve.statusCode, 200);
    assert.equal(cache.invalidations, 2);
    const approved = await app.inject({ method: 'GET', url: '/api/me', headers: { cookie: shopCookie } });
    assert.equal(approved.json().user.shop_status, 'approved');
  } finally {
    if (shopId) {
      await db.query('DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE email = $1)', [shopEmail]);
      await db.query('DELETE FROM shops WHERE id = $1', [shopId]);
      await db.query('DELETE FROM users WHERE email = $1', [shopEmail]);
    }
    await db.query('DELETE FROM sessions WHERE user_id = $1', [adminId]);
    await db.query('DELETE FROM users WHERE id = $1', [adminId]);
    await app.close();
  }
});
