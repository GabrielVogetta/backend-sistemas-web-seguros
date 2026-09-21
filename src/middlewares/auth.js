import { createResponse } from '../utils/utils.js';
import usersService from '../services/service.js';
import jwt from 'jsonwebtoken';

export default function middlewares(){
    return {
        jwtAuth: (req, res, next) => {
        
            // Verificar se há header de autorização
            if(!req.headers.authorization) {
                return createResponse().unauthorized(res, 'Authorization header is missing.');
            }
        
            // Try catch utilizado para capturar possível erro no token enviado
            // Token mal formado, expirado ou inválido
            try {
                // Verificar token passando o secret registrado em .env
                // Estrutura do envio do Bearer token é "Bearer <token>"
                // Necessário separar por espaço e portanto fica array[0] = "Bearer" e array[1] = "<token>"
                const tokenVerified = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
                // Gerar um atributo user no request
                // Passar para req.user o Payload com id e role do usuário que fez a requisição
                req.user = tokenVerified;
                // Passar para a próxima função registrada na rota, funções que estão em ../controllers/controller.js
                return next();
            } catch (error) {
                // Retornar erro caso ocorra
                return createResponse().unauthorized(res, error.message);
            }
        },
        requireAdmin: (req, res, next) => {
            // Somente admin pode acessar o próximo recurso
            if(req.user.role !== "admin"){
                return createResponse().unauthorized(res, 'Access denied');
            }
            
            // Encontrar e retornar usuário através do id enviado pelo middleware
            const userById = usersService().findById(req.user.id);
            
            // Verificar se usuário existe e a role enviada pelo middleware é a mesma
            if (!userById || userById.role !== req.user.role) {
                return createResponse().unauthorized(res, 'Access denied');
            }

            return next();
        },
        requireAdminOrOperator: (req, res, next) => {

            // Usuários que não são admin ou operator
            if (req.user.role !== "admin" && req.user.role !== "operator") {
                return createResponse().unauthorized(res, 'Access denied');
            }

            // Em métodos que necessitam de body
            if(req.method !== 'GET'){
                // Operador não pode alterar role
                if(req.body.role && req.user.role == "operator"){
                    return createResponse().unauthorized(res, 'Access denied');
                }
            }
            
            // Encontrar e retornar usuário através do id enviado pelo middleware
            const userById = usersService().findById(req.user.id);
            
            // Verificar se usuário existe e a role enviada pelo middleware é a mesma
            if (!userById || userById.role !== req.user.role) {
                return createResponse().unauthorized(res, 'Access denied');
            }

            return next();
        }
    }
}