import { currentUser } from '@chonguon/platform/session';
import { getShopsForAdmin, reviewShop, SHOP_QUEUE_CACHE } from './service.js';

export function shopRoutes(app, db, cache) {
  app.get('/api/admin/shops', async (request, reply) => {
    const actor = await currentUser(db, request);
    const result = await getShopsForAdmin(db, actor, request.query.cursor, cache);
    if (!result) return reply.code(403).send({ error: 'Chỉ admin được xem hồ sơ shop.' });
    if (result.error) return reply.code(result.status).send({ error: result.error });
    return result;
  });

  app.post('/api/admin/shops/:id/decision', async (request, reply) => {
    const actor = await currentUser(db, request);
    const result = await reviewShop(db, actor, request.params.id, request.body?.decision, request.body?.note);
    if (result.error) return reply.code(result.status).send({ error: result.error });
    await cache.invalidate(SHOP_QUEUE_CACHE);
    return result;
  });
}
