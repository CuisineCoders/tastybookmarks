import 'dotenv/config';
import { app } from './app';

const PORT = process.env.PORT || 3000;
let server: ReturnType<typeof app.listen>;

export const startServer = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
            resolve();
        }).on('error', (err) => {
            reject(err);
        });
    });
};

export const stopServer = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (server) {
            server.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Server stopped');
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
};
