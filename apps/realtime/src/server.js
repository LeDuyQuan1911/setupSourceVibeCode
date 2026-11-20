import { buildRealtimeApp } from './app.js';

const app = buildRealtimeApp();
const port = Number(process.env.WS_PORT ?? 3002);
app.server.listen(port, '127.0.0.1');
app.server.on('error', (error) => {
  console.error(error);
  process.exitCode = 1;
});
