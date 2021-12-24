import { Request, Response, NextFunction } from 'express';
import Note from '../schemas/note';
const noteList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find();
    if (notes) {
      res.json({ status: 200, message: notes });
    } else {
      res.json({ status: 404, message: 'no note list' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const noteListByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.body;
    const lists = await Note.find({ createdAt: date });
    res.json({ lists });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const createNote = async (req: Request, res: Response, next: NextFunction) => {
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
const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, content } = req.body;
    const result = await Note.updateOne({ _id: id }, { content });
    if (result) res.json({ message: 'update success', stateCode: 200 });
    else {
      res.json({ message: 'update fail', stateCode: 404 });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    await Note.deleteOne({ _id: id });
    res.json({ message: 'delete success', stateCode: 200 });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export { noteList, createNote, updateNote, deleteNote, noteListByDate };
