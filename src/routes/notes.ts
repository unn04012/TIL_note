import express from 'express';
import {
  noteList,
  noteListByDate,
  noteByTitle,
  createSubNote,
  createNote,
  updateNote,
  deleteNote,
  searchNote,
  noteById,
} from '../controllers/note';

export default class Notes {
  path = '/notes';
  router = express.Router();
  constructor() {
    this.router.get('/', noteList);
    this.router.get('/search', searchNote);
    this.router.get('/:id', noteById);
    this.router.get('/date/:date', noteListByDate);
    this.router.post('/', createNote);
    this.router.post('/:id', createSubNote);
    this.router.patch('/:id', updateNote);
    this.router.delete('/:id', deleteNote);
  }
}
