import express, { Request, Response, NextFunction } from 'express';
import { compareHashedPassword } from '../config/Encryption';
import User from '../schemas/user';
import { logIn } from '../controllers/Login';
import Auth from '../middlewares/Auth';

export default class Login {
  path = '/login';
  router = express.Router();
  constructor() {
    this.router.post('/', this.logIn);
  }

  logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    await compareHashedPassword(password, user?.password as string, user?.salt as string);
    let token = '';
    if (user) {
      const auth = new Auth({ email, nick: user.nick });
      token = auth.createToken();
    }

    res.status(200).json({ message: 'success login', token });
  };
}
