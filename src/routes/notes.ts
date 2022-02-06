import express, { Request, Response, NextFunction } from 'express';
import { createSubNote, createNote, updateNote, deleteNote, noteById } from '../controllers/note';
import Note from '../schemas/note';

export default class Notes {
  path = '/notes';
  router = express.Router();
  constructor() {
    this.router.get('/:id', noteById);
    this.router.post('/', createNote);
    this.router.post('/:id', createSubNote);
    this.router.patch('/:id', updateNote);
    this.router.delete('/:id', deleteNote);
    // for (let i = 0; i < this.router.stack.length; i++) {
    //   for (let j = 0; j < this.router.stack[i].route.stack.length; j++) {
    //     this.router.stack[i].route.stack[j].handle = this.wrapAsync(this.router.stack[i].route.stack[j].handle);
    //   }
    // }
  }

  noteById = async (req: Request, res: Response, next: NextFunction) => {
    const { keyword } = req.query;
    if (keyword) {
      const regex = new RegExp(`.*${keyword}.*`, 'i');
      const result = await Note.find(
        {
          $or: [{ title: { $regex: regex } }, { search: { $regex: regex } }],
        },
        { title: true, search: true },
      );
      res.json({ message: result, stateCode: 200 });
    }
    const { id } = req.params;
    const note = await Note.find({ _id: id });
    const subPages = await Note.find({ parentId: note[0]._id });
    res.json({ message: note, status: 200, subPages: subPages ? subPages : null });
  };
}
