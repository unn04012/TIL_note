import express, { Request, Response, NextFunction } from 'express';
import { trashList, getTrashById, restoreTrash, permanentDelete, restoreAll } from '../controllers/trash';

export default class Trash {
  path = '/trash';
  router = express.Router();
  constructor() {
    this.router.get('/', trashList);
    this.router.get('/:id', getTrashById);

    this.router.post('/restore', restoreAll);
    this.router.post('/restore/:id', restoreTrash);
    this.router.delete('/permanent/:id', permanentDelete);
  }
}
