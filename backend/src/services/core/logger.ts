import { debug } from 'debug';
import env from '@/env';

export class LoggerService {
  static log(tag: string, message: string) {
    if (env.DEBUG) {
      debug(tag)(message);
    }
  }
}
