import { prettify } from 'lib/core/prettier';

export type Method = 'index' | 'show' | 'store' | 'update' | 'destroy';
export const METHODS: Method[] = ['index', 'show', 'store', 'update', 'destroy'];

export default function controller(name: string, methods: Method[]) {
  const allowed = (methods.length ? methods : METHODS).reduce((acc, cur) => {
    return `${acc}\nstatic async ${cur}(ctx: HttpContextContract) {
      return withSuccess(ctx, { now: new Date().getTime() });
      }\n`;
  }, '');

  return prettify(`
    import { HttpContextContract } from '@app:contracts/http.contract';
    import { withSuccess } from '@app:helpers/http';

    export default class ${name}Controller {
      ${allowed} 
    }
  `);
}
