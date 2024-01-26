import jwt from 'jsonwebtoken';
import env from '@/env';

export default class JwtService {
  static sign(payload: any, lifetime?: string) {
    return jwt.sign(payload, env.APP_SECRET || '', {
      expiresIn: lifetime || env.JWT_LIFETIME,
    });
  }

  static async verify<T>(token: string): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, env.APP_SECRET || '', (err, decoded) => {
        if (err) {
          return reject(err);
        }

        return resolve(decoded as T);
      });
    });
  }
}
