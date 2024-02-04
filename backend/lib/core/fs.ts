import { mkdir, writeFile } from 'fs';
import { join, resolve } from 'path';
import { promisify } from 'util';
import { bold, green, style } from './colors';

const ROOT = resolve(__dirname, '../../');

export async function mkdirp(path: string) {
  return await new Promise((resolve, reject) => {
    mkdir(path, { recursive: true }, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(void 0);
    });
  });
}

export async function createFile(folder: string, files: Record<string, string>) {
  for (const [fileName, content] of Object.entries(files)) {
    const filepath = join(ROOT, folder, fileName);
    await promisify(writeFile)(filepath, content);

    console.log(style(`created: ${filepath.replace(ROOT, '')}`, green, bold));
  }
}
