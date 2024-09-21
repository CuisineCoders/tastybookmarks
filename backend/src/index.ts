import { connectDB } from './db';
import { startServer } from './server';

async function main() {
    try {
        await connectDB();
        await startServer();
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

main();
