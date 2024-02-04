import { argv } from 'process';
import { createFile, mkdirp } from './core/fs';
import controller, { METHODS, Method } from './templates/controller';

const [command, ...args] = argv.slice(2);

const pascalCase = (str: string) => {
  return str.replace(/(^\w|-\w)/g, (g) => g.replace(/-/, '').toUpperCase());
};

const getPathAndName = (name: string) => {
  const parts = name.includes('/') ? name.split('/') : [name];
  const fileName = parts.pop() as string;
  const path = parts.length ? parts.join('/') : '';
  return { path, fileName };
};

if (command === 'make:controller') {
  const [name, ...options] = args;
  const { path, fileName } = getPathAndName(name);

  const methods = options
    .filter((c) => c.startsWith('@'))
    .map((c) => c.replace('@', ''))
    .filter((arg) => METHODS.includes(arg as Method)) as Method[];

  (async () => {
    const code = await controller(pascalCase(fileName), methods);
    const folder = `src/controllers/${path}`;

    if (path) {
      await mkdirp(folder);
    }

    await createFile(folder, { [`${fileName}.controller.ts`]: code });
  })();
}
