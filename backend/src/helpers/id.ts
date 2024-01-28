import { randomBytes, randomUUID } from 'node:crypto';

export type LongId = string;
export type ShortId = string;

export function shortId(): ShortId {
  return randomBytes(3 * 4).toString('base64');
}

export function longId(): LongId {
  return randomUUID();
}
