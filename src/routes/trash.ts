import express, { Request, Response, NextFunction } from 'express';
import { trashList, getTrashById, restoreTrash, permanentDelete, restoreAll } from '../controllers/trash';

export default class Trash {
  path = '/trash';
  router = express.Router();
  constructor() {
    this.router.get('/', this.wrapAsync(trashList));
    this.router.get('/:id', this.wrapAsync(getTrashById));

    this.router.post('/restore', this.wrapAsync(restoreAll));
    this.router.post('/restore/:id', this.wrapAsync(restoreTrash));
    this.router.delete('/permanent/:id', this.wrapAsync(permanentDelete));
  }
  wrapAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    // callback function : 인자로 함수를 전달하는 함수
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  };
}
