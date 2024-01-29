import { Database } from '@hocuspocus/extension-database';
import { Server } from '@hocuspocus/server';
import type { ServerType } from '@hono/node-server/dist/types';
import { WebSocketServer } from 'ws';
import JwtService from '../services/auth/jwt';
import DocumentSocketService from '../services/documents/socket';

import type {
  fetchPayload,
  onAuthenticatePayload,
  storePayload,
} from '@hocuspocus/server';

// Load document from database
const fetch = async ({ documentName: id }: fetchPayload) => {
  return await DocumentSocketService.getDocumentBinaryContent(id);
};

// Update document in database
const store = async ({ documentName: id, state }: storePayload) => {
  await DocumentSocketService.updateDocument(id, state);
};

// Validate JWT token
const onAuthenticate = async ({ token }: onAuthenticatePayload) => {
  await JwtService.verify(token);
};

const hocuspocusServer = Server.configure({
  onAuthenticate,
  extensions: [new Database({ fetch, store })],
});

// Configure Hocuspocus server
const setup = (app: ServerType) => {
  //@ts-ignore
  const ws = new WebSocketServer({ server: app as ServerType });
  const handler = hocuspocusServer.handleConnection.bind(hocuspocusServer);

  ws.on('connection', handler);
};

export default setup;
