import Fastify from 'fastify';
import { createDatabase } from '@chonguon/platform/db';
import { createCache } from '@chonguon/platform/cache';
import { identityRoutes } from './modules/identity/routes.js';
import { shopRoutes } from './modules/shops/routes.js';

export function buildApp(db = createDatabase(), cache = createCache()) {
  const app = Fastify({ logger: true, bodyLimit: 64 * 1024 });
  app.addHook('onRequest', async (request, reply) => {
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) return;
    const origin = request.headers.origin;
    const host = request.headers.host;
    let sameOrigin = false;
    try { sameOrigin = Boolean(origin && host && new URL(origin).host === host); } catch { /* invalid origin */ }
    if (!sameOrigin) return reply.code(403).send({ error: 'Yêu cầu không cùng nguồn.' });
  });
  app.get('/health', async () => {
    await db.query('SELECT 1');
    return { ok: true };
  });
  identityRoutes(app, db, cache);
  shopRoutes(app, db, cache);
  app.addHook('onClose', async () => {
    await cache.close();
    await db.end();
  });
  return app;
}
