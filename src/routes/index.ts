import express, { Request, Response, NextFunction } from 'express';

export default class Index {
  path = '/';
  router = express.Router();
  constructor() {
    this.router.get('/lists/:id', this.index);
  }
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ text: 'hello world typescript' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}
