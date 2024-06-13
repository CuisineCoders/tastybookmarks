import 'dotenv/config';
import express, { Application } from 'express';
import recipeRoutes from './routes/recipeRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => {
    console.log(`Server is runnung at http://localhost:${PORT}`);
});
