import crypto from 'crypto';

const createHashedPassword = (plainPassword: string): Promise<{ key: string; salt: string }> => {
  //
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      // buf : 기존 salt key
      // plainPassword : 입력 비밀번호
      crypto.pbkdf2(plainPassword, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve({ key: key.toString('base64'), salt: buf.toString('base64') });
      });
    });
  });
};
const compareHashedPassword = (plainPassword: string, hashPassword: string, salt: string) => {
  //

  return new Promise((resolve, reject) => {
    // plainPassword : 입력 비밀번호
    crypto.pbkdf2(plainPassword, salt, 100000, 64, 'sha512', (err, key) => {
      if (err) reject(err);

      resolve(key.toString('base64') === hashPassword);
    });
  });
};

export { createHashedPassword, compareHashedPassword };
