import { Server } from '@hocuspocus/server';
import { Database } from '@hocuspocus/extension-database';
import ws from 'express-ws';
import DocumentSocketService from '../services/documents/socket';
import JwtService from '../services/auth/jwt';

import type {
  fetchPayload,
  onAuthenticatePayload,
  storePayload,
} from '@hocuspocus/server';
import type { Express } from 'express';

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

// Configure Hocuspocus server
const setup = ({ app }: { app: Express }) => {
  const server = Server.configure({
    onAuthenticate,
    extensions: [new Database({ fetch, store })],
  });

  const { app: instance } = ws(app);
  const handler = server.handleConnection.bind(server);

  instance.ws('/', handler);
};

export default setup;
