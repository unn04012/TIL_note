import express, { Request, Response, NextFunction } from 'express';

export default class Trash {
  path = '/trash';
  router = express.Router();
  constructor() {
    this.router.get('/', this.trashList);
    this.router.post('/', this.createTrash);
  }

  trashList = (req: Request, res: Response, next: NextFunction) => {
    return res.json('success');
  };

  createTrash = (req: Request, res: Response, next: NextFunction) => {
    return res.json('success');
  };
}
