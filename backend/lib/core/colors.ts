export function green(text: string) {
  return `\u001b[32m${text}\u001b[39m`;
}

export function red(text: string) {
  return `\u001b[31m${text}\u001b[39m`;
}

export function yellow(text: string) {
  return `\u001b[33m${text}\u001b[39m`;
}

export function bold(text: string) {
  return `\u001b[1m${text}\u001b[22m`;
}

type StyleFn = (text: string) => string;

export function style(text: string, ...styleFn: StyleFn[]) {
  if (!styleFn.length) {
    return text;
  }

  return styleFn.reduce((acc, fn) => fn(acc), text);
}
