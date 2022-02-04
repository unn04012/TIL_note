import express, { Request, Response, NextFunction } from 'express';
import { createSubNote, createNote, updateNote, deleteNote, noteById } from '../controllers/note';

export default class Notes {
  path = '/notes';
  router = express.Router();
  constructor() {
    this.router.get('/:id', this.wrapAsync(noteById));
    this.router.post('/', this.wrapAsync(createNote));
    this.router.post('/:id', this.wrapAsync(createSubNote));
    this.router.patch('/:id', this.wrapAsync(updateNote));
    this.router.delete('/:id', this.wrapAsync(deleteNote));
  }

  wrapAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    // callback function : 인자로 함수를 전달하는 함수
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  };
}
