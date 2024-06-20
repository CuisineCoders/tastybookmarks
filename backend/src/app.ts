import express, { Application } from 'express';
import { recipeRouter } from './routes/recipeRouter';

export const app: Application = express();

app.use('/api/recipes', recipeRouter);
