import { createTransport } from 'nodemailer';
import { render } from '@react-email/render';
import env from '@app:env';
import { LoggerService } from './logger';

export type MailerData = Record<string, any>;
export type MailerOptions = {
  from?: string;
  to: string;
  subject: string;
};

const url =
  env.MAILER_USE_MAILDEV && env.NODE_ENV === 'development'
    ? 'smtp://user:pass@127.0.0.1:1025'
    : env.MAILER_SMTP_URL;

const transporter = createTransport(url);

export class MailerService {
  static async send<T, P>({ from, ...options }: MailerOptions, view: T, data: P) {
    const response = await transporter.sendMail({
      from: from || env.MAILER_FROM,
      ...options,
      html: render((view as any)(data)),
    });

    return response;
  }

  static sendLater<T, P>(options: MailerOptions, view: T, data: P) {
    setTimeout(async () => {
      try {
        await this.send<T, P>(options, view, data);
      } catch (error: any) {
        LoggerService.log('mailer', error.message);
      }
    }, 0);
  }
}
