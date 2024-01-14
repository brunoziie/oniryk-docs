import { Server } from '@hocuspocus/server';
import { Database } from '@hocuspocus/extension-database';
import { Express } from 'express';
import { Knex } from 'knex';
import ws from 'express-ws';
import DocumentSocketService from '../services/documents/socket';
import JwtService from '../services/auth/jwt';

const setup = ({ app, db }: { app: Express; db: Knex }) => {
  const server = Server.configure({
    async onAuthenticate({ token }) {
      await JwtService.verify(token);
    },

    extensions: [
      new Database({
        async fetch({ documentName }) {
          const document = await db('documents').where({ id: documentName }).first();

          if (document && document.binary_content) {
            return document.binary_content;
          }

          return null;
        },

        async store({ documentName, state }) {
          await db('documents')
            .where({ id: documentName })
            .update({
              binary_content: state,
              content: DocumentSocketService.transformToHtml(state),
              updated_at: new Date(),
            });
        },
      }),
    ],
  });

  const { app: instance } = ws(app);

  instance.ws('/', (ws, request) => {
    server.handleConnection(ws, request);
  });
};

export default setup;
