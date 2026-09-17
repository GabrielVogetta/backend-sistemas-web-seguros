import { Router } from 'express';
import usersController from '../controllers/controller.js';

const router = Router();

router.get('/api/users', usersController().getUsers);

router.post('/api/users', usersController().createUser);

router.put('/api/users', usersController().updateUser);

router.delete('/api/users', usersController().deleteUser);

export default router;