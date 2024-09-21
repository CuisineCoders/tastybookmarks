import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/tastybookmarks');
        console.log('MongoDB verbunden');
    } catch (error) {
        console.error('MongoDB-Verbindungsfehler', error);
        process.exit(1); // Beendet den Prozess bei Verbindungsfehlern
    }
}
