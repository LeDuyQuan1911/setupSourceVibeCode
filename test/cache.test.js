import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCache } from '@chonguon/platform/cache';

test('cache-aside reuses reads, changes generation on write, and falls back on failure', async () => {
  const values = new Map();
  let fail = false;
  let ttl;
  const client = {
    isReady: true,
    async get(key) { if (fail) throw new Error('Redis unavailable'); return values.get(key) ?? null; },
    async setEx(key, seconds, value) { ttl = seconds; values.set(key, value); },
    async incr(key) { if (fail) throw new Error('Redis unavailable'); const next = Number(values.get(key) ?? 0) + 1; values.set(key, String(next)); return next; }
  };
  const cache = createCache({ client });
  let loads = 0;
  const loader = async () => ({ count: ++loads });

  assert.deepEqual(await cache.getOrLoad('shops', 'first', 15, loader), { count: 1 });
  assert.deepEqual(await cache.getOrLoad('shops', 'first', 15, loader), { count: 1 });
  assert.equal(loads, 1);
  assert.equal(ttl, 15);
  assert.equal(await cache.invalidate('shops'), true);
  assert.deepEqual(await cache.getOrLoad('shops', 'first', 15, loader), { count: 2 });
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  let concurrentLoads = 0;
  const slowLoader = async () => { concurrentLoads++; await gate; return { ok: true }; };
  const first = cache.getOrLoad('concurrent', 'same', 15, slowLoader);
  const second = cache.getOrLoad('concurrent', 'same', 15, slowLoader);
  release();
  assert.deepEqual(await Promise.all([first, second]), [{ ok: true }, { ok: true }]);
  assert.equal(concurrentLoads, 1);
  fail = true;
  assert.deepEqual(await cache.getOrLoad('shops', 'first', 15, loader), { count: 3 });
  assert.equal(await cache.invalidate('shops'), false);
});
