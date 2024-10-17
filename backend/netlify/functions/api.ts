import serverless from 'serverless-http';
import { app } from '../../src/app'; // Importiere deine bestehende App

export const handler = serverless(app);