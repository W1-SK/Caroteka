import request from 'supertest';
import { PrismaClient } from '@prisma/client';

jest.mock('@scalar/express-api-reference', () => ({
    apiReference: () => (req: any, res: any, next: any) => next()
}));

import app from '../index';

const prisma = new PrismaClient();

describe('RBAC & Security Tests (Role a Práva)', () => {
    let adminToken: string;
    let userToken: string;
    const uniqueMonsterName = `Testovací Drak ${Date.now()}`;

    beforeAll(async () => {

        await prisma.user.deleteMany({ where: { email: 'admin@caroteka.cz' } });

        await request(app).post('/auth/register').send({ email: 'admin@caroteka.cz', password: 'password123' });
        const adminRes = await request(app).post('/auth/login').send({ email: 'admin@caroteka.cz', password: 'password123' });
        adminToken = adminRes.body.token;


        const uniqueUserEmail = `user-${Date.now()}@test.cz`;
        await request(app).post('/auth/register').send({ email: uniqueUserEmail, password: 'password123' });
        const userRes = await request(app).post('/auth/login').send({ email: uniqueUserEmail, password: 'password123' });
        userToken = userRes.body.token;
    });

    afterAll(async () => {

        await prisma.monster.deleteMany({ where: { name: uniqueMonsterName } });
        await prisma.user.deleteMany({ where: { email: 'admin@caroteka.cz' } });
        await prisma.$disconnect();
    });

    it('Měl by vrátit 401 (Unauthorized), pokud pošleme request úplně bez tokenu', async () => {
        const res = await request(app)
            .post('/monsters')
            .send({ name: 'Vetřelec', source: 'Vesmír', cr: '10', type: 'Alien', data: {} });
        expect(res.statusCode).toBe(401);
    });

    it('Měl by vrátit 403 (Forbidden), když se obyčejný USER snaží vytvořit monstrum', async () => {
        const res = await request(app)
            .post('/monsters')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ name: 'Skřet', source: 'Jeskyně', cr: '1', type: 'Humanoid', data: {} });
        expect(res.statusCode).toBe(403);
    });

    it('Měl by vrátit 201 (Created), když ADMIN vytvoří monstrum', async () => {
        const res = await request(app)
            .post('/monsters')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: uniqueMonsterName, source: 'Jest Testy', cr: '20', type: 'Dragon', data: {} });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.name).toBe(uniqueMonsterName);
    });
});