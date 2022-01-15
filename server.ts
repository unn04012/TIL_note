import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
/** rotues */
import Notes from './src/routes/notes';
import Trash from './src/routes/trash';

import App from './src/app';
import connect from './src/schemas/index';
import cors from 'cors';
dotenv.config();

/**
 * DEFINE MODELS
 * @OBJECT
 * name : modelName;
 * value : modelObject
 * 
 * const models = [
    {name : 'User',   value : User},
    {name : 'Domain', value : Domain},
 ];
  
const model = new modelIndex(models);
  



 model.db.sequelize.sync({ force: false })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error(err);
 });
 */
connect();
/**
 * DEFINE ROUTES
 * @OBJECT
 */
const routes = [new Notes(), new Trash()];

/**
 * DEFINE MIDDLEWARES
 */
const __dirname = path.resolve();

const allowedOrigins = ['http://localhost:3000', '*'];

const options = {
  origin: allowedOrigins,
};

const middlewares = [
  express.static(path.join(__dirname, 'public')),
  express.json(),
  express.urlencoded({ extended: false }),
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
];

/**
 * DEFINE SETTINGS FOR express().set
 */

const settings = [{ key: 'view engine', value: 'html' }];

const appConfig = {
  routes,
  middlewares,
  settings,
  port: process.env.PORT || 8000,
};

// CREATE SERVER
new App(appConfig).listen();
