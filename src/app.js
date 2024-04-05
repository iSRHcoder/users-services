import express from 'express';
import route from './routes/route.json' assert { type: 'json' };
import apiRouter from './routes/apiRouter.js';
import dotenv from 'dotenv';
import logger from './middlewares/logger.js';
import {
  PUBLIC_FOLDER_PATH,
  LOGS_FOLDER_PATH,
  UPLOADS_FOLDER_PATH,
  loggerPath,
} from '../constants.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logger(loggerPath));
app.use(express.static(PUBLIC_FOLDER_PATH));
app.use(express.static(LOGS_FOLDER_PATH));
app.use(express.static(UPLOADS_FOLDER_PATH));

app.use(route.API, apiRouter);

export default app;
