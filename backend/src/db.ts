import 'dotenv/config';
import mongoose from 'mongoose';

let isConnected = false; // Verfolge den Verbindungsstatus

export async function connectDB(): Promise<void> {
    if (isConnected) {
        return;
    }

    const mongoUri = process.env.NODE_ENV === 'production'
        ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
        : `mongodb://${process.env.MONGO_HOST_LOCAL}/${process.env.MONGO_DB_NAME}`;

    if (!mongoUri) {
        throw new Error('MongoDB URI is not defined');
    }

    try {
        await mongoose.connect(mongoUri);
        isConnected = true;
        console.log(`Successfully connected to MongoDB: ${mongoUri}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB: ', error);
        process.exit(1);
    }
}
