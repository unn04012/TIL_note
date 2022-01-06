import express from 'express';
import {
  noteList,
  noteListByDate,
  noteByTitle,
  createSubNote,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/note';

export default class Notes {
  path = '/notes';
  router = express.Router();
  constructor() {
    this.router.get('/', noteList);
    this.router.get('/date/:date', noteListByDate);
    this.router.get('/title/:title', noteByTitle);
    this.router.post('/title/:id', createSubNote);
    this.router.post('/', createNote);
    this.router.patch('/:id', updateNote);
    this.router.delete('/:id', deleteNote);
  }
}
