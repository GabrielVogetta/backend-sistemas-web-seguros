import express from 'express';
const app = express();
const port = 8080;
import {selectUsers, updateUser, deleteUser, insertUser} from './db.js';

export default function main() {

    app.use(express.json());

    // Listar usuários
    app.get('/api/users', (req, res) => {
        res.json(selectUsers());
    });

    // Inserir usuários
    app.post('/api/users', (req, res) => {
        console.log("Post received:");
        console.log(req.body);

        if(req.body){
            const { name, email, password, role } = req.body;

            if(!name || !email || !password || !role){
                return res.status(400).json({ error: 'Name, Email, Password, Role are required' });
            };

             const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                role
            };

            res.status(201).json({
                message: 'User created successfully!',
                data: newUser
            });
            console.log("User created successfully!");
        }else{
            return res.status(400).json({ error: "Required request body is missing." });
        }
    });

    // Atualizar usuários
    app.put('/api/users', (req, res) => {
        console.log("Put received:");
        console.log(req.body);

        if(req.body){
            const { id, name, email, password, role } = req.body;

            if(!id || !name || !email || !password || !role){
                return res.status(400).json({ error: 'Id, Name, Email, Password, Role are required' });
            };

             const updatedUser = {
                id,
                name,
                email,
                password,
                role
            };

            res.status(201).json({
                message: 'User updated successfully!',
                data: updatedUser
            });
            console.log("User updated successfully!");
        }else{
            return res.status(400).json({ error: "Required request body is missing." });
        }
    });

    // Deletar usuários
    app.delete('/api/users', (req, res) => {
        console.log("Delete received:");
        console.log(req.body);

        if(req.body){
            const { id } = req.body;

            if(!id){
                return res.status(400).json({ error: 'Id are required' });
            };

            res.status(204).json({
                message: 'User deleted successfully!'
            });
            console.log("User deleted successfully!");
        }else{
            return res.status(400).json({ error: "Required request body is missing." });
        }
    });

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
};