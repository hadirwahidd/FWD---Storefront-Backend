import { Router } from 'express';
import * as controllers from '../../controllers/products.controllers';
import verifyAuthToken from '../../middleware/auth.middleware';

const productsRoutes = Router();

// INDEX route
productsRoutes.get('/', controllers.index);

// GET BY CATEGORY route
productsRoutes.get('/category/:category', controllers.getByCategory);

// SHOW route
productsRoutes.get('/id/:id', controllers.show);

// CREATE route
productsRoutes.post('/', verifyAuthToken, controllers.create);

export default productsRoutes;
