import request from 'supertest';
import { PrismaClient } from '@prisma/client';

jest.mock('@scalar/express-api-reference', () => ({
    apiReference: () => (req: any, res: any, next: any) => next()
}));

import app from '../index';

const prisma = new PrismaClient();

describe('Monsters API CRUD Tests', () => {
    let adminToken: string;
    let createdMonsterId: string;
    const uniqueMonsterName = `Testovací Goblin ${Date.now()}`;

    beforeAll(async () => {
        await prisma.user.deleteMany({ where: { email: 'monsteradmin@caroteka.cz' } });

        await request(app).post('/auth/register').send({ email: 'monsteradmin@caroteka.cz', password: 'password123' });

        await prisma.user.update({
            where: { email: 'monsteradmin@caroteka.cz' },
            data: { role: 'ADMIN' }
        });

        const res = await request(app).post('/auth/login').send({ email: 'monsteradmin@caroteka.cz', password: 'password123' });
        adminToken = res.body.token;
    });

    afterAll(async () => {
        if (createdMonsterId) {
            await prisma.monster.deleteMany({ where: { id: createdMonsterId } });
        }
        await prisma.monster.deleteMany({ where: { name: { contains: 'Testovací Goblin' } } });
        await prisma.user.deleteMany({ where: { email: 'monsteradmin@caroteka.cz' } });
        await prisma.$disconnect();
    });

    it('POST /monsters', async () => {
        const res = await request(app)
            .post('/monsters')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: uniqueMonsterName,
                source: 'Monster Manual',
                cr: '1/4',
                type: 'Humanoid',
                data: { hp: 7, ac: 15 }
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.name).toBe(uniqueMonsterName);
        createdMonsterId = res.body.data.id;
    });


    it('GET /monsters', async () => {
        const res = await request(app).get('/monsters?limit=1');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('DELETE /monsters/:id', async () => {
        if (!createdMonsterId) return;

        const res = await request(app)
            .delete(`/monsters/${createdMonsterId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toBe(200);
    });
});