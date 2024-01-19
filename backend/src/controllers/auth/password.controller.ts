import { HttpContextContract } from '@app/contracts/http.contract';
import db from '@app/database/connector';
import { withSuccess } from '@app/helpers/http';
import { PasswordService } from '@app/services/auth/password';
import { SessionService } from '@app/services/auth/session';
import {
  LoginPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from './password.schema';

export default class PasswordController {
  static async login({ request, response }: HttpContextContract) {
    const { email, password } = request.payload as LoginPayload;
    const userId = await PasswordService.login(db, email, password);
    const session = await SessionService.createSession(db, userId);

    withSuccess(response, { user: session.payload, token: session.token });
  }

  static async forgot({ request, response }: HttpContextContract) {
    const { email } = request.payload as ForgotPasswordPayload;
    await PasswordService.forgot(db, email);
    withSuccess(response);
  }

  static async reset({ request, response }: HttpContextContract) {
    const { code, password } = request.payload as ResetPasswordPayload;
    await PasswordService.reset(db, code, password);
    withSuccess(response);
  }
}
