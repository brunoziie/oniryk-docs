import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '../helpers/http';

export default class AppController {
  static async healthcheck({ response }: HttpContextContract) {
    withSuccess(response, { now: new Date().getTime() });
  }
}
