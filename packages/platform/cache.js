import { createClient } from 'redis';

const prefix = 'chonguon:cache:v1';

export function createCache({ url = process.env.REDIS_URL, client: suppliedClient } = {}) {
  const inFlight = new Map();
  const client = suppliedClient ?? (url ? createClient({
    url,
    disableOfflineQueue: true,
    socket: {
      connectTimeout: 1_000,
      socketTimeout: 1_000,
      reconnectStrategy: (retries) => Math.min(200 * 2 ** Math.min(retries, 5), 5_000)
    }
  }) : null);

  if (client && !suppliedClient) {
    let lastErrorLog = 0;
    client.on('error', (error) => {
      if (Date.now() - lastErrorLog < 30_000) return;
      lastErrorLog = Date.now();
      process.stderr.write(`${JSON.stringify({ level: 'warn', source: 'redis_cache', code: error.code ?? 'UNAVAILABLE' })}\n`);
    });
    void client.connect().catch(() => {});
  }

  return {
    async getOrLoad(namespace, key, ttlSeconds, loader) {
      if (!client?.isReady) return loader();
      let cacheKey;
      try {
        const version = await client.get(`${prefix}:version:${namespace}`) ?? '0';
        cacheKey = `${prefix}:data:${namespace}:${version}:${key}`;
        const hit = await client.get(cacheKey);
        if (hit !== null) return JSON.parse(hit);
      } catch {
        return loader();
      }

      if (inFlight.has(cacheKey)) return inFlight.get(cacheKey);
      const pending = (async () => {
        const value = await loader();
        try {
          if (client.isReady) await client.setEx(cacheKey, ttlSeconds, JSON.stringify(value));
        } catch { /* cache failure does not fail the request */ }
        return value;
      })();
      inFlight.set(cacheKey, pending);
      try {
        return await pending;
      } finally {
        inFlight.delete(cacheKey);
      }
    },
    async invalidate(namespace) {
      if (!client?.isReady) return false;
      try {
        await client.incr(`${prefix}:version:${namespace}`);
        return true;
      } catch {
        return false;
      }
    },
    async close() {
      if (client && !suppliedClient) client.destroy();
    }
  };
}
