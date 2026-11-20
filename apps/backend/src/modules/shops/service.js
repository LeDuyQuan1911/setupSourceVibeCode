import { randomUUID } from 'node:crypto';
import { hashPassword } from '../../core/password.js';
import { createShopOwner } from '../identity/service.js';
import { insertShop, listShops, decideShop } from './repository.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const value = (input, max = 160) => typeof input === 'string' ? input.trim().slice(0, max) : '';
export const SHOP_QUEUE_CACHE = 'admin-shops';

export async function registerShop(db, body) {
  const email = value(body.email).toLowerCase();
  const password = body.password;
  const shop = {
    name: value(body.shopName), representative: value(body.representative),
    phone: value(body.phone, 40), address: value(body.address, 300),
    salesChannel: value(body.salesChannel, 300)
  };
  if (!emailPattern.test(email) || typeof password !== 'string' || password.length < 12 || password.length > 200 || Object.values(shop).some((part) => !part)) {
    return { error: 'Điền đủ hồ sơ, email hợp lệ và mật khẩu ít nhất 12 ký tự.', status: 400 };
  }
  const passwordHash = await hashPassword(password);
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const userId = await createShopOwner(client, email, passwordHash);
    await insertShop(client, { ...shop, id: randomUUID(), ownerUserId: userId });
    await client.query('COMMIT');
    return { userId };
  } catch (error) {
    await client.query('ROLLBACK');
    if (error.code === '23505') return { error: 'Email này đã được dùng.', status: 409 };
    throw error;
  } finally {
    client.release();
  }
}

function decodeCursor(value) {
  if (value === undefined) return null;
  if (typeof value !== 'string' || value.length > 300 || !/^[A-Za-z0-9_-]+$/.test(value)) return false;
  try {
    const cursor = JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
    if (![0, 1].includes(cursor.priority) || !Number.isFinite(Date.parse(cursor.createdAt)) || !uuidPattern.test(cursor.id)) return false;
    return cursor;
  } catch {
    return false;
  }
}

export async function getShopsForAdmin(db, actor, cursorValue, cache) {
  if (actor?.role !== 'admin') return null;
  const cursor = decodeCursor(cursorValue);
  if (cursor === false) return { error: 'Trang không hợp lệ.', status: 400 };
  const load = async () => {
    const pageSize = 25;
    const rows = await listShops(db, cursor, pageSize);
    const hasMore = rows.length > pageSize;
    const page = rows.slice(0, pageSize);
    const last = page.at(-1);
    const nextCursor = hasMore ? Buffer.from(JSON.stringify({ priority: last.priority, createdAt: last.created_at, id: last.id })).toString('base64url') : null;
    return { shops: page.map(({ priority, ...shop }) => shop), nextCursor };
  };
  return cache ? cache.getOrLoad(SHOP_QUEUE_CACHE, cursorValue ?? 'first', 15, load) : load();
}

export async function reviewShop(db, actor, id, decision, note) {
  if (actor?.role !== 'admin') return { error: 'Chỉ admin được duyệt shop.', status: 403 };
  if (!['approved', 'rejected'].includes(decision) || typeof note !== 'string' || (decision === 'rejected' && !note.trim())) {
    return { error: 'Chọn quyết định; nếu từ chối, hãy ghi lý do.', status: 400 };
  }
  if (!uuidPattern.test(id)) return { error: 'Không tìm thấy hồ sơ đang chờ duyệt.', status: 404 };
  const shop = await decideShop(db, { id, decision, note: note.trim().slice(0, 500), adminId: actor.id });
  return shop ? { shop } : { error: 'Không tìm thấy hồ sơ đang chờ duyệt.', status: 404 };
}
