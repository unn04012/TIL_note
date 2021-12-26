import express from 'express';
import { noteList, noteListByDate, createNote, updateNote, deleteNote } from '../controllers/note';

export default class Notes {
  path = '/notes';
  router = express.Router();
  constructor() {
    this.router.get('/', noteList);
    this.router.get('/:date', noteListByDate);
    this.router.post('/', createNote);
    this.router.patch('/', updateNote);
    this.router.delete('/', deleteNote);
  }
}
