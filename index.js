import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './src/routes/route.js';
const app = express();

app.use(cors());

const port = 8080;

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});