import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import HttpException from '../error/Error';

const castErrorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const errorCode = 404;
  const errorMessage = 'Not Found Resource';
  console.log(error);
  if (error instanceof Error.CastError) {
    res.status(404).json({ errorCode, errorMessage });
  }
  // else {
  //   res.status(403).json({ errorCode: 403, errorMessage: error.message });
  // }
  next(error);
};

const jwtError = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof TokenExpiredError) {
    res.status(403).json({ errorCode: error.status, errorMessage: error.message });
  } else {
    console.log(error instanceof JsonWebTokenError);
    res.status(403).json({ errorCode: error.status, errorMessage: error.message });
  }
  next(error);
};
const databaseErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const errorCode = 503;
  const errorMessage = 'Server Error';
  if (error instanceof Error) {
    res.status(404).json({ errorCode, errorMessage });
  }
  next(error);
};

export { castErrorHandler, jwtError };
