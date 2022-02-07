import express, { Request, Response, NextFunction } from 'express';
import { trashList, getTrashById, restoreTrash, permanentDelete, restoreAll } from '../controllers/trash';
import { verifyToken } from '../middlewares/Auth';

export default class Trash {
  path = '/trash';
  router = express.Router();
  constructor() {
    this.router.get('/', verifyToken, trashList);
    this.router.get('/:id', verifyToken, getTrashById);

    this.router.post('/restore', verifyToken, restoreAll);
    this.router.post('/restore/:id', verifyToken, restoreTrash);
    this.router.delete('/permanent/:id', verifyToken, permanentDelete);
  }
}
