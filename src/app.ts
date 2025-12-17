import express from 'express';
import Routes from './routes/index.js';
import cors from 'cors';

const app = express();
// app.use(cors());
app.use(express.json());
app.use(Routes);

export default app;