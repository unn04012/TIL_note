import express, { Request, Response, NextFunction } from 'express';
import { createHashedPassword } from '../config/Encryption';
import User from '../schemas/user';

export default class Register {
  path = '/register';
  router = express.Router();
  constructor() {
    this.router.post('/', this.createUser);
  }
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, nick } = req.body;
    const { key, salt } = await createHashedPassword(password);
    await User.create({ email, password: key, nick, salt });

    res.status(200).json({ message: 'success register' });
  };
}
