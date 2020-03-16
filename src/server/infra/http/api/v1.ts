import express from 'express';
import { userRouter } from '../../../modules/users/infra/http/route';
import { povRouter } from 'modules/pov/infra/http/route';

const v1Router = express.Router();

v1Router.use('/user', userRouter);
v1Router.use('/pov', povRouter);

// All routes go here

export { v1Router };
