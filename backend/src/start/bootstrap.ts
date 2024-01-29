import hocuspocus from '@app:start/hocuspocus';
import { connection } from '@db:client';
import hono from './hono';
import mailer from './mailer';

export default async function start() {
  // HTTP Router
  const { app, server } = hono();

  // Collaborative editing server
  hocuspocus(server);

  // Local mail server
  mailer();

  // Graceful shutdown
  process.on('uncaughtException', (err) => {
    connection?.destroy();
    process.exit(1);
  });

  return app;
}
