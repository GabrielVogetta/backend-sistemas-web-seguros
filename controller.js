import express from 'express';
const app = express();
const port = 8080;
import {selectUsers, updateUser, deleteUser, insertUser} from './db.js';

export default function main() {

    app.get('/users', (req, res) => {
        res.send(selectUsers());
    });

    app.get('/update/:id', (req, res) => {
        res.send(updateUser(req.params.id, {
            id: req.params.id,
            name: 'Usuário atualizado',
            email: 'atualizado@test.com',
            password: '5678',
            role: 'client'
        }));
    });

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
};