import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { createDatabase } from '@chonguon/platform/db';
import { currentUser } from '@chonguon/platform/session';

function sameOrigin(request) {
  try {
    return Boolean(request.headers.origin && request.headers.host && new URL(request.headers.origin).host === request.headers.host);
  } catch {
    return false;
  }
}

function reject(socket, status, message) {
  socket.end(`HTTP/1.1 ${status} ${message}\r\nConnection: close\r\nContent-Length: 0\r\n\r\n`);
}

export function buildRealtimeApp(db = createDatabase()) {
  const websocket = new WebSocketServer({ noServer: true, maxPayload: 64 * 1024 });
  const server = createServer(async (request, response) => {
    if (request.url !== '/health') {
      response.writeHead(404).end();
      return;
    }
    try {
      await db.query('SELECT 1');
      response.writeHead(200, { 'Content-Type': 'application/json' }).end('{"ok":true}');
    } catch {
      response.writeHead(503).end();
    }
  });

  server.on('upgrade', async (request, socket, head) => {
    if (request.url !== '/ws') return reject(socket, 404, 'Not Found');
    if (!sameOrigin(request)) return reject(socket, 403, 'Forbidden');
    try {
      const user = await currentUser(db, request);
      if (!user || (user.role !== 'admin' && user.shop_status !== 'approved')) return reject(socket, 401, 'Unauthorized');
      websocket.handleUpgrade(request, socket, head, (connection) => {
        websocket.emit('connection', connection, request, user);
      });
    } catch {
      reject(socket, 503, 'Service Unavailable');
    }
  });

  websocket.on('connection', (connection, _request, user) => {
    connection.isAlive = true;
    connection.on('pong', () => { connection.isAlive = true; });
    connection.on('error', () => connection.terminate());
    connection.send(JSON.stringify({ type: 'ready', userId: user.id }));
    connection.on('message', () => connection.close(1003, 'Messaging is not available yet'));
  });

  const heartbeat = setInterval(() => {
    for (const connection of websocket.clients) {
      if (!connection.isAlive) {
        connection.terminate();
        continue;
      }
      connection.isAlive = false;
      connection.ping();
    }
  }, 30_000);
  heartbeat.unref();

  async function close() {
    clearInterval(heartbeat);
    for (const client of websocket.clients) client.terminate();
    await new Promise((resolve) => websocket.close(resolve));
    await new Promise((resolve, rejectError) => server.close((error) => error ? rejectError(error) : resolve()));
    await db.end();
  }

  return { server, close };
}
