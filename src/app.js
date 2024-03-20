import express from 'express';
import route from './routes/route.json' assert { type: 'json' };
import apiRouter from './routes/apiRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(route.ROOT, apiRouter);

export default app;
