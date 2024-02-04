import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { format } from 'prettier';

const root = resolve(__dirname, '../../');

const prettierConfig = JSON.parse(readFileSync(join(root, '.prettierrc.json'), 'utf-8'));

export const prettify = async (code: string) => {
  return await format(code, {
    ...prettierConfig,
    parser: 'typescript',
    filepath: 'file.ts',
  });
};
