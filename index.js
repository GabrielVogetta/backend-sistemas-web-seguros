import express from 'express';
import router from './src/routes/route.js';
const app = express();
const port = 8080;
import {selectUsers, updateUser, deleteUser, insertUser} from './src/repositories/db.js';

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});