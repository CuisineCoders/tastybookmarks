import 'dotenv/config';
import express, { Application } from 'express';
import { recipeRouter } from './routes/recipeRouter';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use('/api/recipes', recipeRouter);

app.listen(PORT, () => {
    console.log(`Server is runnung at http://localhost:${PORT}`);
});
