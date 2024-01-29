import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '../helpers/http';

export default class AppController {
  static async healthcheck(ctx: HttpContextContract) {
    return withSuccess(ctx, { now: new Date().getTime() });
  }
}
