import { startServer, stopServer } from '../src/server';
import request from 'supertest';
import { app } from '../src/app';


beforeAll(async () => await startServer());

afterAll(async () => await stopServer());

beforeEach(async () => {
    await request(app).delete('/api/recipes').expect(200);

    // Add two recipes
    await request(app)
        .post('/api/recipes')
        .send({ url: 'https://www.chefkoch.de/rezepte/110591046358332/Rosenkohl-Kasseler-Auflauf.html' })
        .expect(201);

    await request(app)
        .post('/api/recipes')
        .send({ url: 'https://www.lecker.de/ueberbackene-nachos-mit-salsa-und-kaese-68615.html' })
        .expect(201);
});


describe('API endpoints', () => {
    it('should add a new recipe', async () => {
        const response = await request(app)
            .post('/api/recipes')
            .send({ url: 'https://www.chefkoch.de/rezepte/2200371352905409/Penne-Tomaten-Hackfleisch-Auflauf.html' })
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body.name).toBe('Penne-Tomaten-Hackfleisch Auflauf');
    });
    
    it('should return error for an invalid URL', async () => {
        const response = await request(app)
            .post('/api/recipes')
            .send({ url: 'invalid-url' })  // Invalid URL
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body.error).toBe('Invalid URL');
    });

    it('should return error if URL is missing', async () => {
        const response = await request(app)
            .post('/api/recipes')
            .send()  // Sends empty body
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body.error).toBe('URL is required');
    });

    it('should retrieve recipes', async () => {
        const response = await request(app)
            .get('/api/recipes')
            .expect(200);

        expect(response.body.length).toBe(2);
        expect(response.body[1].name).toBe('Überbackene Nachos mit Salsa und Käse');
    });

    it('should retrieve recipes by ID', async () => {
        const response = await request(app)
            .get('/api/recipes/1')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.name).toBe('Rosenkohl-Kasseler-Auflauf');
    });

    it('should delete a recipe', async () => {
        await request(app)
            .delete('/api/recipes/1')
            .expect(200);

        const response = await request(app)
            .get('/api/recipes')
            .expect(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe('Überbackene Nachos mit Salsa und Käse');
    });
});
