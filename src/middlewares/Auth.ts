import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// dotenv.config();
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * {
  email: '',
  nick: '',
  iat: 1644241382,
  exp: 1644241442,
  iss: 'tilnote'
   */
  req.decoded = jwt.verify(req.headers.authorization as string, process.env.JWT_SECRET as string);
  console.log(req.decoded);
  next();
};

export { verifyToken };
