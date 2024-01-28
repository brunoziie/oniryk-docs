import DocumentRepository from '@db:repositories/document';
import { TiptapTransformer } from '@hocuspocus/transformer';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import { convert } from 'html-to-text';
import * as Y from 'yjs';

const EXTENSIONS = [StarterKit, Table, TableHeader, TableRow, TableCell];

export default class DocumentSocketService {
  static async getDocumentBinaryContent(id: string) {
    return await DocumentRepository.getDocumentBinaryContent(id);
  }

  static async updateDocument(id: string, binaryContent: Uint8Array) {
    const content = this.transformToHtml(binaryContent);
    const searchableContent = this.transformToSearchableText(content);
    const values = { binaryContent, content, searchableContent };

    await DocumentRepository.updateDocumentContent(id, values);
  }

  static fromBinaryToDocument(buffer: any) {
    const document = new Y.Doc();
    Y.applyUpdate(document, buffer);
    return document;
  }

  static transformToHtml(content: any) {
    const document = this.fromBinaryToDocument(content);
    const tiptapTransformer = TiptapTransformer.fromYdoc(document);
    const html = generateHTML(tiptapTransformer.default, EXTENSIONS);
    return html;
  }

  static transformToSearchableText(html: string) {
    const text = convert(html, {
      selectors: [{ selector: 'a', format: 'skip' }],
    });

    const sanitized = text
      .replace(/\s+|\t|\n/g, ' ')
      .replace(/[\.,?!]/g, '')
      .toLowerCase();

    const words = sanitized
      .split(' ')
      .filter(Boolean)
      .filter((c) => c.length > 2);

    const uniqueWords = [...new Set(words)].sort(() => Math.random() - 0.5);
    return uniqueWords.join(' ');
  }
}
