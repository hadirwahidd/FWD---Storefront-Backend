import { Router } from 'express';
import * as controllers from '../../controllers/orders.controllers';
import verifyAuthToken from '../../middleware/auth.middleware';

const ordersRoutes = Router();

// INDEX route
ordersRoutes.get('/:id', verifyAuthToken, controllers.index);

// GET CURRENT ORDER route
ordersRoutes.get('/current/:id', verifyAuthToken, controllers.getCurrentOrder);

// GET COMPLETED ORDERS route
ordersRoutes.get(
  '/completed/:id',
  verifyAuthToken,
  controllers.getCompletedOrders
);

// ADD PRODUCTS route
ordersRoutes.post('/:id/products', verifyAuthToken, controllers.addProduct);

export default ordersRoutes;
