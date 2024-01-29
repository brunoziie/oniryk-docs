import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '../../helpers/http';

export default class DocumentSharesController {
  static async index(ctx: HttpContextContract) {
    withSuccess(ctx, { now: new Date().getTime() });
  }
}
