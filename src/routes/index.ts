import { Router, Request, Response } from 'express';
import productsRoutes from './api/products.routes';
import usersRoutes from './api/users.routes';
import ordersRoutes from './api/orders.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);

routes.get('/', (_req: Request, res: Response) => {
  res.send('Api Route!');
});

export default routes;
