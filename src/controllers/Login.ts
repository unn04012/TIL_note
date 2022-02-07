import { Request, Response, NextFunction } from 'express';
import { compareHashedPassword } from '../config/Encryption';
import jwt from 'jsonwebtoken';
import User from '../schemas/user';

interface PayLoad {
  email: string;
  nick: string;
}
const logIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) await compareHashedPassword(password, user?.password as string, user.salt as string);
  let token = '';
  if (user) {
    token = createToken({ email, nick: user.nick });
  }
  res.status(200).json({ message: 'success login', token });
  // else res.status(404).json({ message: 'success fail' });
};

const createToken = (payLoad: PayLoad) => {
  const jwtSecret = process.env.JWT_SECRET;
  const option = {
    expiresIn: '1m',
    issuer: 'tilnote',
  };
  if (!jwtSecret) throw Error('Internal Server Error');

  const token = jwt.sign(payLoad, jwtSecret, option);

  return token;
};

export { logIn };
