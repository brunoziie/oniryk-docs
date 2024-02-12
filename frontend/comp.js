const name = process.argv[2];
const fs = require('fs');
const path = require('path');

const flags = process.argv.filter((arg) => arg.startsWith('--'));
const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));

const reserved = ['--client', '--children'];
const configFile = require(path.join(process.cwd(), 'package.json'));
const configs = configFile['components.config'] || {};
const envs = ['--default', ...flags.filter((flag) => reserved.includes(flag))];
const clean = (s) => s.replace(/^--/g, '');
const onFlag = (flag, truishy = '', falsy = '') =>
  flags.includes(`--${flag}`) ? truishy : falsy;

const config = envs.map(clean).reduce((acc, flag) => {
  console.log({ flag });
  return configs[flag] || acc;
}, null) || { output: 'src/components' };

console.log({ flags: onFlag('client', 'true', 'false') });

const filename = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const template = `${onFlag('client', "'use client';\n\n")}export type ${name}Props = ${onFlag('children', 'React.PropsWithChildren<{}>', '{}')};

export default function ${name}({}: ${name}Props) {
  return <div>${name}</div>;
}`;

const green = (text) => console.log(`\x1b[32m${text}\x1b[0m`);

green(`Created ${[config.output, filename + '.tsx'].join('/')}`);

console.log(path.join(process.cwd(), config.output, filename + '.tsx'));

fs.writeFileSync(path.join(process.cwd(), config.output, filename + '.tsx'), template);
