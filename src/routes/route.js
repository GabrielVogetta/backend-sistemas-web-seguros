import { Router } from 'express';
import usersController from '../controllers/controller.js';

const router = Router();

router.post('/login', usersController().login);

router.get('/api/users', usersController().getUsers);

router.post('/api/users', usersController().createUser);

router.put('/api/users', usersController().updateUser);

router.delete('/api/users', usersController().deleteUser);

router.get('/api/profile', usersController().getProfile);

export default router;