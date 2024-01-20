import { Server } from '@hocuspocus/server';
import { Database } from '@hocuspocus/extension-database';
import { Express } from 'express';
import ws from 'express-ws';
import DocumentSocketService from '../services/documents/socket';
import JwtService from '../services/auth/jwt';
import prisma from './database';

const setup = ({ app }: { app: Express }) => {
  const server = Server.configure({
    async onAuthenticate({ token }) {
      await JwtService.verify(token);
    },

    extensions: [
      new Database({
        async fetch({ documentName }) {
          const document = await prisma.document.findUnique({
            where: { id: documentName },
          });

          if (document && document.binaryContent) {
            return document.binaryContent;
          }

          return null;
        },

        async store({ documentName, state }) {
          await prisma.document.update({
            where: { id: documentName },
            data: {
              binaryContent: state,
              content: DocumentSocketService.transformToHtml(state),
              updatedAt: new Date(),
            },
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
