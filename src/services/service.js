import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const users = [
    {
        id: "1789645811266",
        name: "Admin",
        email: "admin@email.com",
        password: "$2b$10$i29v0hYwWywrPCUiwVXB7.o9YogA4nBrmNzDCUPRxcceDYynhNybu", // 123
        role: "admin"
    },
    {
        id: "1789918135810",
        name: "Operator",
        email: "operator@email.com",
        password: "$2b$10$iykrXjY04jzJSJvJWFeTs.Bzg5aPCDpX6NqhxzqCzYUxdLm8FfXyS", // 456
        role: "operator"
    },
    {
        id: "1789918158962",
        name: "User",
        email: "user@email.com",
        password: "$2b$10$l9dGEcCHs21oBBeLoea.GOBHFteRPnPgSsQT4lRf08aPCmMzXIUy.", // 789
        role: "user"
    }
];

export default function usersService() {
    return {
        login: (email, password) => {

            // Buscar usuário na base através do email
            const user = users.find(user => user.email === email);

            // Verificar se usuário existe e comparar a hash com a senha enviada
            if (user && bcrypt.compareSync(password, user.password)) {

                // Gerar payload com id e role
                // Validar assinatura de token
                // Setar tempo de validação
                const token = jwt.sign(
                    {
                      id: user.id,
                      role: user.role
                    }, 
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                // Retornar usuário sem a senha
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: token
                };
            }
                
            // Se email não for encontrado ou a senha não estiver correta, retornar null
            return null;
        },
        findById: (id) => {
        
            // Encontrar index através do id
            const userIndex = users.findIndex(user => user.id === id);
            
            // Se usuário não existir, index será -1
            if(userIndex == -1){
                return null
            }

            // Retornar informações do usuário através do index encontrado
            const {name, email, role} = users[userIndex]; 

            // Retornar usuário sem email ou senha
            return {
                id,
                name,
                email,
                role 
            }
        },
        returnUsers: () => {
    
            const usersWithoutPasswords = users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
    
            return usersWithoutPasswords;
        },
        addUser: (user) => {

            // Encriptar a senha enviada
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;

            // Gerar id com a data atual, garantindo que não haverá repetição
            // Id será enviado como parâmetro de rota e será tratado como string
            user.id = Date.now().toString();
            users.push(user);
            
            // Retornar usuário sem senha 
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
        },
        existsUserByEmail: (email) => {
            // Retornar true ou false ao buscar email
            return users.some(user => user.email === email);
        },
        updateUser: (updatedUser) => {
            // Encontrar index através do id
            const userIndex = users.findIndex(user => user.id === updatedUser.id);

            // Se usuário não existir, index será -1
            if (userIndex !== -1) {

                // Não alterar senha do usuário, somente demais informações
                const newUser = {
                    password: users[userIndex].password,
                    ...updatedUser
                }

                users[userIndex] = newUser;

                return true;
            }

            return false;
        },
        deleteUser: (id) => {
            // Encontrar index através do id
            const userIndex = users.findIndex(user => user.id === id);

            // Se usuário não existir, index será -1
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
                return true;
            }

            return false;
        }
    }
};