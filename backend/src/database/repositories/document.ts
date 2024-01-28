import { db } from '@db:client';
import { documents } from '@db:schemas';
import { eq } from 'drizzle-orm';

export type DocumentContentValue = {
  binaryContent: Uint8Array;
  content: string;
  searchableContent: string;
};

export default class DocumentRepository {
  static async getDocumentBinaryContent(id: string) {
    const document = await this.getDocument(id);

    if (document && document.binaryContent) {
      return document.binaryContent;
    }

    return null;
  }

  static async getDocument(id: string) {
    const [document] = await db.select().from(documents).where(eq(documents.id, id));
    return document || null;
  }

  static async updateDocumentContent(id: string, values: DocumentContentValue) {
    return await db.update(documents).set(values).where(eq(documents.id, id));
  }
}
