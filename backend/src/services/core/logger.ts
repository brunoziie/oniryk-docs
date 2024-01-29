import env from '@app:env';
import { debug } from 'debug';

export class LoggerService {
  static log(tag: string, message: string) {
    if (env.DEBUG_LOGGING) {
      debug(tag)(message);
    }
  }
}
