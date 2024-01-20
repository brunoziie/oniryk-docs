import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

export function camelizeObjectKeys(obj: Record<string, any>): Record<string, any> {
  const camelizedObj: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelizedKey = camelCase(key);
      const value = obj[key];

      if (Array.isArray(value)) {
        camelizedObj[camelizedKey] = value.map((item) => {
          if (typeof item === 'object' && item !== null) {
            return camelizeObjectKeys(item);
          } else {
            return item;
          }
        });
      } else if (
        typeof value === 'object' &&
        value !== null &&
        !(value instanceof Date)
      ) {
        camelizedObj[camelizedKey] = camelizeObjectKeys(value);
      } else {
        camelizedObj[camelizedKey] = value;
      }
    }
  }

  return camelizedObj;
}

export function snakeifyObjectKeys(obj: Record<string, any>): Record<string, any> {
  const snakeifiedObj: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeifiedKey = snakeCase(key);
      const value = obj[key];

      if (Array.isArray(value)) {
        snakeifiedObj[snakeifiedKey] = value.map((item) => {
          if (typeof item === 'object' && item !== null) {
            return snakeifyObjectKeys(item);
          } else {
            return item;
          }
        });
      } else if (
        typeof value === 'object' &&
        value !== null &&
        !(value instanceof Date)
      ) {
        snakeifiedObj[snakeifiedKey] = snakeifyObjectKeys(value);
      } else {
        snakeifiedObj[snakeifiedKey] = value;
      }
    }
  }

  return snakeifiedObj;
}
