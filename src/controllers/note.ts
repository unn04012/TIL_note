import { Request, Response, NextFunction } from 'express';
import Note from '../schemas/note';
import Trash from '../schemas/trash';

const searchIndex = (content: string) => {
  let index = -1;
  const quotes = [];
  if (content.indexOf('```') !== -1) {
    do {
      index = content.indexOf('```', index + 1);
      if (index !== -1) quotes.push(index);
    } while (index !== -1);
    let searchContent = content.slice(0, quotes[0]);
    for (let i = 1; i < quotes.length; i += 2) {
      if (quotes[i + 1]) searchContent += content.slice(quotes[i] + 3, quotes[i + 1]);
    }

    if (quotes[quotes.length - 1] !== content.length - 1)
      searchContent += content.slice(quotes[quotes.length - 1] + 3, content.length);
    return searchContent.replace(/[^a-zA-Z0-9():ㄱ-ㅎ|ㅏ-ㅣ|가-힣._\s'"]/g, '').trim();
  }
  return content;
};

const makeResult = (message: string | Array<typeof Note>, status: number) => {
  return { message, status };
};
const noteList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find({ parentId: null });
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
    const subPages = await Note.find({ parentId: lists[0]._id });
    res.json({ message: lists, status: 200, subPages: subPages ? subPages : null });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const noteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const note = await Trash.find({ _id: id });
    res.json({ message: note, status: 200 });
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
    const searchContent = searchIndex(content);
    await Note.create({ title, content, search: searchContent });
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
    const searchContent = searchIndex(content);
    const result = await Note.create({ title, content, parentId: id, search: searchContent });
    if (result) {
      res.json(makeResult('create subNote success', 200));
    } else {
      res.json(makeResult('create fail', 400));
    }
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
    const findNote = await Note.find({ $or: [{ _id: id }, { parentId: id }] });
    const changeIdNote = findNote.map(note => {
      console.log(note);
      return {
        _id: note._id.toString(),
        parentId: note.parentId,
        title: note.title,
        content: note.content,
        search: note.search,
        createdAt: note.createdAt,
      };
    });
    console.log(changeIdNote);
    const TrashResult = await Trash.insertMany(changeIdNote);

    const deleteResult = await Note.deleteMany({ $or: [{ _id: id }, { parentId: id }] });

    res.json({ message: 'delete success', stateCode: 200 });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const searchNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    const regex = new RegExp(`.*${search}.*`, 'i');
    const result = await Note.find(
      {
        $or: [{ title: { $regex: regex } }, { search: { $regex: regex } }],
      },
      { title: true, search: true },
    );
    // if (search) {
    //   result.forEach(element => {
    //     if (element.search) {
    //       const queryIndex = element.search.indexOf(search as string);
    //       console.log(search, queryIndex);
    //       if (queryIndex !== -1) element.search = element.search.slice(queryIndex, element.search.length);
    //     }
    //   });
    // }

    res.json({ message: result, stateCode: 200 });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export {
  noteList,
  createNote,
  updateNote,
  deleteNote,
  noteListByDate,
  noteByTitle,
  createSubNote,
  searchNote,
  noteById,
};
