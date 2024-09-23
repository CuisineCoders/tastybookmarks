import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/tastybookmarks');
        console.log('Successfully connected to MongoDB.');
    } catch (error) {
        console.error('Failed to connect to MongoDB: ', error);
        process.exit(1); // TODO: Find out about while loop around connection attempt
    }
}
