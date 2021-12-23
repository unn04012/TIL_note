import express, { Request, Response, NextFunction } from 'express';
import Note from '../schemas/note';

export default class Notes {
  path = '/notes';
  router = express.Router();
  constructor() {
    this.router.get('/', this.list);
    this.router.get('/:date', this.listByDate);
    this.router.post('/', this.createNote);
    this.router.patch('/', this.updateNote);
    this.router.delete('/', this.deleteNote);
  }
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
  listByDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date } = req.body;
      const lists = await Note.find({ createdAt: date });
      res.json({ lists });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
  createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content } = req.body;
      await Note.create({ content });
      res.json({ message: 'success', stateCode: 200 });
    } catch (err) {
      console.error(err);
      res.json({ message: 'failed', stateCode: 400 });
      next(err);
    }
  };
  updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, content } = req.body;
      await Note.updateOne({ _id: id }, { content });
      res.json({ message: 'update success', stateCode: 200 });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
  deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      await Note.deleteOne({ _id: id });
      res.json({ message: 'delete success', stateCode: 200 });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}
