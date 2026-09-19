import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const users = [
    {
        "id": 1789645811266,
        "name": "Gabriel Vogetta",
        "email": "gabriel.vogetta@example.com",
        "password": "$2b$10$i29v0hYwWywrPCUiwVXB7.o9YogA4nBrmNzDCUPRxcceDYynhNybu", // 123
        "role": "admin"
    }
];

export default function usersService() {
    return {
        login: (email, password) => {
            const user = users.find(user => user.email === email);

            if (user && bcrypt.compareSync(password, user.password)) {

                const token = jwt.sign(
                    {
                      id: user.id
                    }, 
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: token
                };
            }
                
            return null;
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
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
            user.id = Date.now();
            users.push(user);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
        },
        existsUserByEmail: (email) => {
            return users.some(user => user.email === email);
        },
        updateUser: (updatedUser) => {
            const userIndex = users.findIndex(user => user.id === updatedUser.id);
            if (userIndex !== -1) {

                const newUser = {
                    password: users[userIndex].password,
                    ...updatedUser
                }

                users[userIndex] = newUser;

                return true;
            }else{
                return false;
            }
        },
        deleteUser: (id) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
                return true;
            }
        },
        findById: (id) => {
            const userIndex = users.findIndex(user => user.id === id);
            const {name, email, role} = users[userIndex]; 

            return {
                id,
                name,
                email,
                role 
            }
        }
    }
};