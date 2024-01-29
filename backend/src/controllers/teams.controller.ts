import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '../helpers/http';

export default class TeamsController {
  static async index(ctx: HttpContextContract) {
    return withSuccess(ctx, { now: new Date().getTime() });
  }
}
