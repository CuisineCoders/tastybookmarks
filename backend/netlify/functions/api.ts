import serverless from 'serverless-http';
import { app } from '../../src/app';
import { connectDB } from '../../src/db';

export const handler = async (event: any, context: any) => {
    await connectDB();
    const expressHandler = serverless(app);
    return expressHandler(event, context);
};