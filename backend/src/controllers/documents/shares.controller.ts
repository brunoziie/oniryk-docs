import { HttpContextContract } from '@app/contracts/http.contract';
import { withSuccess } from '../../helpers/http';

export default class DocumentSharesController {
  static async index({ response }: HttpContextContract) {
    withSuccess(response, { now: new Date().getTime() });
  }
}
