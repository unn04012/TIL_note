import { Request, Response, NextFunction } from 'express';
import TrashSchema from '../schemas/trash';

import Note from '../schemas/note';

import { model, Schema, Model, Document } from 'mongoose';
import { findAllandDelete } from '../database/Database';

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
const trashList = async (req: Request, res: Response, next: NextFunction) => {
  const trashList = await TrashSchema.find();
  res.json({ message: 'success', trashList });
};

const getTrashById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const trash = await TrashSchema.find({ _id: id });
  res.json({ message: 'success', trash });
};

const restoreTrash = async (req: Request, res: Response, next: NextFunction) => {
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
  res.json({ statusCode: 200, message: 'success delete' });
};

const permanentDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  await TrashSchema.deleteOne({ _id: id });
  res.json({ statusCode: 200, message: 'success permanent Delete' });
};

const restoreAll = async (req: Request, res: Response, next: NextFunction) => {
  const trashes = await findAllandDelete(TrashSchema);
  if (trashes) {
    const notes = trashes.map(trash => {
      return {
        _id: trash._id.toString(),
        parentId: trash.parentId,
        title: trash.title,
        content: trash.content,
        search: trash.search,
        createdAt: trash.createdAt,
      };
    });
    Note.insertMany(notes);
  }
  res.json({ message: 'success', statusCode: 200 });
};

export { trashList, getTrashById, restoreTrash, permanentDelete, restoreAll };
