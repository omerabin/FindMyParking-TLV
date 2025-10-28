import { Application } from 'express';
import ParkingRouter from './parkingRouter';
import UserRouter from './userRouter';

export const initRoutes = (app: Application) => {
  app.use('/parkings', ParkingRouter);
  app.use('/users', UserRouter);
};
