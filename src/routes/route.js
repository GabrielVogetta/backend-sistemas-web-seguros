import { Router } from 'express';
import usersController from '../controllers/controller.js';
import middlewares from '../middlewares/auth.js';

const router = Router();

// POST /login - Login
// Acesso concedido a todos
router.post('/login', usersController().login);

// GET /users - Listar todos os usuários
// Necessário login
// Necessário ser admin ou operator
router.get('/users', middlewares().jwtAuth, middlewares().requireAdminOrOperator, usersController().getUsers);

// POST /users - Criar usuário
// Necessário login
// Necessário ser admin
router.post('/users', middlewares().jwtAuth, middlewares().requireAdmin, usersController().createUser);

// PUT /users/:id - Atualizar usuário
// Necessário login
// Necessário ser admin ou operator
router.put('/users/:id', middlewares().jwtAuth, middlewares().requireAdminOrOperator, usersController().updateUser);

// DELETE /users/:id - Deletar usuário
// Necessário login
// Necessário ser admin
router.delete('/users/:id', middlewares().jwtAuth, middlewares().requireAdmin, usersController().deleteUser);

// GET /profile
router.get('/profile', middlewares().jwtAuth, usersController().getProfile);

export default router;