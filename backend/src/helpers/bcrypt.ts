import bcrypt from 'bcrypt';

export async function encrypt(value: string) {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(value, 10, function (err, hash) {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
}

export async function compare(value: string, hash: string) {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(value, hash, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}
