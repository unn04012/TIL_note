import express, { Request, Response, NextFunction } from 'express';
import { compareHashedPassword } from '../config/Encryption';
import User from '../schemas/user';

export default class Login {
  path = '/login';
  router = express.Router();
  constructor() {
    this.router.post('/', this.wrapAsync(this.logIn));
  }
  logIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const result = await compareHashedPassword(password, user?.password as string, user?.salt as string);
    if (result) res.status(200).json({ message: 'success login' });
    else res.status(404).json({ message: 'success fail' });
  };

  wrapAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    // callback function : 인자로 함수를 전달하는 함수
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  };
}
