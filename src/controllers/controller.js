import usersService from '../services/service.js';
import {createResponse} from '../utils/utils.js';

export default function usersController(){
  return {
    login: (req, res) => {

        // Obrigatório enviar body na requisição
        if(!req.body){
            return createResponse().badRequest(res, 'Required request body is missing.');
        }

        // Obrigatório envio de email e senha para login
        if(!req.body.email || !req.body.password) {
            return createResponse().badRequest(res, 'Email and Password are required');
        }

        // Realizar processo de login
        // Verificando informações na base de usuários
        // Comparando com senha encripitada
        // Gerando JWT
        // Caso usuário não exista ou senha esteja incorreta, retornar null
        const user = usersService().login(req.body.email, req.body.password);

        // Obrigatório que o email/usuário exista e senha esteja correta
        if(!user) {
            return createResponse().unauthorized(res, 'Invalid email or password.');
        }

        // Caso tudo esteja certo, retornar usuário com o token e sem senha
        return createResponse().ok(res, { message: 'Login successful!', user });
    },
    getProfile: (req, res) => {

        // Middleware jwtAuth

        // Encontrar e retornar usuário através do id enviado pelo middleware
        const user = usersService().findById(req.user.id);

        // Caso tudo esteja certo, retornar usuário sem senha
        return createResponse().ok(res, user);
    },
    getUsers: (req, res) => {

        // Middleware jwtAuth
        // Middleware requireAdminOrOperator

        // Caso tudo esteja certo, retornar usuários sem senha
        return createResponse().ok(res, usersService().returnUsers());
    },
    createUser: (req, res) => {

        // Middleware jwtAuth
        // Middleware requireAdmin

        // Obrigatório enviar body na requisição
        if(!req.body){
            return createResponse().badRequest(res, 'Required request body is missing.');
        }

        // Obrigatório envio de nome, email, password e role para cadastro
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return createResponse().badRequest(res, 'Name, Email, Password, Role are required');
        };

        // Verificar se email já não existe
        if (usersService().existsUserByEmail(email)) {
            return createResponse().badRequest(res, 'This email already exists.');
        };

        // Caso tudo esteja certo, criar usuário e retornar ao client
        // Senha enviada é passada para addUser, mas addUser não irá retornar senha
        const newUser = usersService().addUser({
            name,
            email,
            password,
            role
        });
        return createResponse().created(res, {
            message: 'User created successfully!',
            data: newUser
        });
    },
    updateUser: (req, res) => {
        
        // Middleware jwtAuth
        // Middleware requireAdminOrOperator

        // Obrigatório enviar body na requisição
        if(!req.body){
            return createResponse().badRequest(res, 'Required request body is missing.');
        }

        // Não é possível atualizar a senha ou ID
        if(req.body.password || req.body.id){
            return createResponse().unauthorized(res, 'Changing password or ID is not allowed.');
        }

        const { name, email, role } = req.body;

        if (!name || !email || !role) {
            return createResponse().badRequest(res, 'Name, Email, Role are required');
        };
     
        const updatedUser = {
            id: req.params.id,
            name,
            email,
            role
        };

        // Verificar se usuário foi encontrado e atualizado
        if(!usersService().updateUser(updatedUser)){
            return createResponse().notFound(res, 'User not found.');
        };
            
        return createResponse().updated(res, {
            message: 'User updated successfully!',
            data: {
                id: updatedUser.id,
                name,
                email,
                role
            }
        });
    },
    deleteUser: (req, res) => {
    
        // Middleware jwtAuth
        // Middleware requireAdmin

        if (usersService().deleteUser(req.params.id)) {
            return createResponse().ok(res, {
                message: 'User deleted successfully!',
            });
        } else {
            return createResponse().notFound(res, 'User not found.');
        }
        
    }
  }
}