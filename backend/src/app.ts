import express, { Application } from 'express';
import cors from 'cors';
import { recipeRouter } from './routes/recipeRouter';

export const app: Application = express();

app.use(cors());

app.use('/api/recipes', recipeRouter);
