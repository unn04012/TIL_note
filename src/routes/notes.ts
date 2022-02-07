import express, { Request, Response, NextFunction } from 'express';
import { createSubNote, createNote, updateNote, deleteNote, noteById } from '../controllers/note';
import { verifyToken } from '../middlewares/Auth';

export default class Notes {
  path = '/notes';
  router = express.Router();
  constructor() {
    this.router.get('/:id', verifyToken, noteById);
    this.router.post('/', verifyToken, createNote);
    this.router.post('/:id', verifyToken, createSubNote);
    this.router.patch('/:id', verifyToken, updateNote);
    this.router.delete('/:id', verifyToken, deleteNote);
  }
}
