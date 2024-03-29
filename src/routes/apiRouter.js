import express from 'express';
import usersRouter from './usersRouter.js';
import route from './route.json' assert { type: 'json' };

const apiRouter = express.Router();

apiRouter.use(route.USERS, usersRouter);

export default apiRouter;
