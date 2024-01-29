import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '@app:helpers/http';
import { PasswordService } from '@app:services/auth/password';
import { SessionService } from '@app:services/auth/session';
import {
  ForgotPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
} from '../../validators/auth/password.schema';

export default class PasswordController {
  static async login(ctx: HttpContextContract) {
    const { email, password } = ctx.get('payload') as LoginPayload;
    const userId = await PasswordService.login(email, password);
    const session = await SessionService.createSession(userId);

    return withSuccess(ctx, { user: session.payload, token: session.token });
  }

  static async forgot(ctx: HttpContextContract) {
    const { email } = ctx.get('payload') as ForgotPasswordPayload;
    await PasswordService.forgot(email);

    return withSuccess(ctx);
  }

  static async reset(ctx: HttpContextContract) {
    const { code, password } = ctx.get('payload') as ResetPasswordPayload;
    await PasswordService.reset(code, password);

    return withSuccess(ctx);
  }
}
