import { Request, Response, NextFunction } from 'express';
import Note from '../schemas/note';

interface List {
  _id: string;
  title: string;
  pages: [string];
  content: string;
  createdAt: Date;
}
const makeResult = (message: string | Array<typeof Note>, status: number) => {
  return { message, status };
};
const noteList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find({ parent: null });
    notes ? res.json({ message: notes, status: 200 }) : res.json(makeResult('no note list', 404));
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const noteByTitle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.params;
    const lists = await Note.find({ title });
    let subPages;
    if (lists[0].pages) {
      subPages = await Note.find({ _id: { $in: lists[0].pages } });
    }
    res.json({ message: lists, status: 200, subPages: subPages ? subPages : null });
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
    const { title, content } = req.body;
    await Note.create({ title, content });
    res.json({ message: 'success', stateCode: 200 });
  } catch (err) {
    console.error(err);
    res.json({ message: 'failed', stateCode: 400 });
    next(err);
  }
};

const createSubNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await Note.create({ title, content, parent: id });
    if (result) {
      await Note.updateOne({ _id: id }, { $push: { pages: result._id } });
    }

    res.json(makeResult('create subNote success', 200));
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await Note.updateOne({ _id: id }, { title, content });
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
    const { id } = req.params;
    await Note.deleteOne({ _id: id });
    res.json({ message: 'delete success', stateCode: 200 });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export { noteList, createNote, updateNote, deleteNote, noteListByDate, noteByTitle, createSubNote };
