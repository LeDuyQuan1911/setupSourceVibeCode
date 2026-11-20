import { createSession, currentUser, endSession } from '@chonguon/platform/session';
import { authenticate } from './service.js';
import { registerShop, SHOP_QUEUE_CACHE } from '../shops/service.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function identityRoutes(app, db, cache) {
  app.post('/api/register', async (request, reply) => {
    const result = await registerShop(db, request.body ?? {});
    if (result.error) return reply.code(result.status).send({ error: result.error });
    await cache.invalidate(SHOP_QUEUE_CACHE);
    await createSession(db, result.userId, reply);
    return reply.code(201).send({ status: 'pending' });
  });

  app.post('/api/login', async (request, reply) => {
    const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : '';
    const password = request.body?.password;
    if (!emailPattern.test(email) || typeof password !== 'string') return reply.code(400).send({ error: 'Email hoặc mật khẩu không hợp lệ.' });
    const userId = await authenticate(db, email, password);
    if (!userId) return reply.code(401).send({ error: 'Email hoặc mật khẩu không đúng.' });
    await createSession(db, userId, reply);
    return { ok: true };
  });

  app.post('/api/logout', async (request, reply) => {
    await endSession(db, request, reply);
    return { ok: true };
  });

  app.get('/api/me', async (request, reply) => {
    const user = await currentUser(db, request);
    if (!user) return reply.code(401).send({ error: 'Bạn cần đăng nhập.' });
    return { user };
  });
}
