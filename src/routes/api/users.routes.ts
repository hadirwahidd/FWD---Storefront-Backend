import Router from 'express';
import * as controllers from '../../controllers/users.controllers';
import verifyAuthToken from '../../middleware/auth.middleware';

const usersRoutes = Router();

// INDEX route
usersRoutes.get('/', verifyAuthToken, controllers.index);

// SHOW route
usersRoutes.get('/:id', verifyAuthToken, controllers.show);

// CREATE route
usersRoutes.post('/', controllers.create);

// UPDATE route
usersRoutes.put('/:id', verifyAuthToken, controllers.update);

// DELETE route
usersRoutes.delete('/:id', verifyAuthToken, controllers.del);

// AUTHENTICATE route
usersRoutes.post('/authenticate', controllers.authenticate);

export default usersRoutes;
