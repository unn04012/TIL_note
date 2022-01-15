import express, { Request, Response, NextFunction } from 'express';
import TrashSchema from '../schemas/trash';

import Note from '../schemas/note';

import { model, Schema, Model, Document } from 'mongoose';

// const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

interface ITrash extends Document {
  _id: Schema.Types.ObjectId;
  parentId?: string;
  title: string;
  content: string;
  search: string;
  createdAt: Date;
  deletedAt: Date;
}

export default class Trash {
  path = '/trash';
  router = express.Router();
  constructor() {
    this.router.get('/', this.trashList);
    this.router.post('/', this.createTrash);
    this.router.post('/restore', this.restoreAll);
    this.router.post('/restore/:id', this.restoreTrash);
    this.router.delete('/permanent/:id', this.permanentDelete);
  }

  trashList = async (req: Request, res: Response, next: NextFunction) => {
    const trashList = await TrashSchema.find();
    return res.json({ message: 'success', trashList });
  };

  createTrash = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    return res.json('success');
  };
  restoreTrash = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const trash = (await TrashSchema.findOne({ _id: id })) as ITrash;
    const changeTrashId = {
      _id: trash._id.toString(),
      parentId: trash.parentId,
      title: trash.title,
      content: trash.content,
      search: trash.search,
      createdAt: trash.createdAt,
    };
    await Note.create(changeTrashId);
    await TrashSchema.deleteOne({ _id: id });
    return res.json('success restore');
  };
  permanentDelete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await TrashSchema.deleteOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  };
  restoreAll = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    return res.json('success');
  };
}
