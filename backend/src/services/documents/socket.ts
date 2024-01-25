import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { generateHTML } from '@tiptap/html';
import * as Y from 'yjs';
import { TiptapTransformer } from '@hocuspocus/transformer';
import { convert } from 'html-to-text';

const EXTENSIONS = [StarterKit, Table, TableHeader, TableRow, TableCell];

export default class DocumentSocketService {
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

    const uniqueWords = [...new Set(words)];

    return uniqueWords.join(' ');
  }
}
