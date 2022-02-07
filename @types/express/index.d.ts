import { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      decoded: JwtPayload | string;
      headers: { authorization: string };
    }
  }
}
