import express from 'express';
import { logIn } from '../controllers/Login';

export default class Login {
  path = '/login';
  router = express.Router();
  constructor() {
    this.router.post('/', logIn);
  }
}
