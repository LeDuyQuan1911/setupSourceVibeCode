import { createHash, randomBytes } from 'node:crypto';

const COOKIE = 'chonguon_session';
const MAX_AGE = 60 * 60 * 24 * 7;

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

export function readCookie(header = '') {
  const value = header.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`));
  return value ? value.slice(COOKIE.length + 1) : null;
}

export async function createSession(db, userId, reply) {
  const token = randomBytes(32).toString('hex');
  await db.query('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES ($1, $2, now() + interval \'7 days\')', [hashToken(token), userId]);
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  reply.header('Set-Cookie', `${COOKIE}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${MAX_AGE}${secure}`);
}

export async function currentUser(db, request) {
  const token = readCookie(request.headers.cookie);
  if (!token || !/^[0-9a-f]{64}$/.test(token)) return null;
  const result = await db.query(`
    SELECT u.id, u.email, u.role, s.id AS shop_id, s.name AS shop_name, s.status AS shop_status
    FROM sessions t JOIN users u ON u.id = t.user_id
    LEFT JOIN shops s ON s.owner_user_id = u.id
    WHERE t.token_hash = $1 AND t.expires_at > now()
  `, [hashToken(token)]);
  return result.rows[0] ?? null;
}

export async function endSession(db, request, reply) {
  const token = readCookie(request.headers.cookie);
  if (token) await db.query('DELETE FROM sessions WHERE token_hash = $1', [hashToken(token)]);
  reply.header('Set-Cookie', `${COOKIE}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`);
}
