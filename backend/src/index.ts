import { startServer } from './server';

startServer().catch(err => {
    console.error('Failed to start server:', err);
});
