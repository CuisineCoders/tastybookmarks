import request from 'supertest';
import { app } from '../src/index';

describe('API endpoints', () => {
    it('should add items and retrieve them', async () => {
        const response1 = await request(app)
            .post('/api/recipes')
            .send({ url: 'https://www.chefkoch.de/rezepte/110591046358332/Rosenkohl-Kasseler-Auflauf.html' })
            .expect(201);
        expect(response1.body.name).toBe('Rosenkohl-Kasseler-Auflauf');

        // Füge das zweite Item hinzu
        const response2 = await request(app)
            .post('/api/recipes')
            .send({ url: 'https://www.lecker.de/ueberbackene-nachos-mit-salsa-und-kaese-68615.html' })
            .expect(201);
        expect(response2.body.name).toBe('Überbackene Nachos mit Salsa und Käse');

        // Lösche das erste Item
        await request(app)
            .delete('/api/recipes/1')
            .expect(200);

        // Überprüfe, dass nur noch das zweite Item übrig ist
        const finalResponse = await request(app)
            .get('/api/recipes')
            .expect(200);
        expect(finalResponse.body.length).toBe(1);
        expect(finalResponse.body[0].id).toBe('2');
    });
});
