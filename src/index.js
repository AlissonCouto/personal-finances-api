import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';

const PORT = 3001;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(PORT);
console.log('Executando...');