import { Router } from 'express';
import usersController from '../controllers/controller.js';

const router = Router();

router.post('/login', usersController().login);

router.get('/users', usersController().getUsers);
router.post('/users', usersController().createUser);
router.put('/users/:id', usersController().updateUser);
router.delete('/users/:id', usersController().deleteUser);

router.get('/profile', usersController().getProfile);

export default router;