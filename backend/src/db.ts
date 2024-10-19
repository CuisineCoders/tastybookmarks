import 'dotenv/config';
import mongoose from 'mongoose';

let isConnected = false; // Verfolge den Verbindungsstatus

export async function connectDB(): Promise<void> {
    if (isConnected) {
        return;
    }
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/tastybookmarks');
        const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
        await mongoose.connect(mongoURI);
        isConnected = true;
        console.log('Successfully connected to MongoDB.');
    } catch (error) {
        console.error('Failed to connect to MongoDB: ', error);
        process.exit(1); // Optional, je nach Fehlermanagement
    }
}
