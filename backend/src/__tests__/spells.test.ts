import request from 'supertest';
import { PrismaClient } from '@prisma/client';

jest.mock('@scalar/express-api-reference', () => ({
    apiReference: () => (req: any, res: any, next: any) => next()
}));

import app from '../index';

const prisma = new PrismaClient();

describe('Spells API CRUD Tests', () => {
    let adminToken: string;
    let createdSpellId: string;
    const uniqueSpellName = `Testovací Ohnivá Koule ${Date.now()}`;

    beforeAll(async () => {
        await prisma.user.deleteMany({ where: { email: 'spelladmin@caroteka.cz' } });


        await request(app).post('/auth/register').send({ email: 'spelladmin@caroteka.cz', password: 'password123' });


        await prisma.user.update({
            where: { email: 'spelladmin@caroteka.cz' },
            data: { role: 'ADMIN' }
        });


        const res = await request(app).post('/auth/login').send({ email: 'spelladmin@caroteka.cz', password: 'password123' });
        adminToken = res.body.token;
    });

    afterAll(async () => {
        if (createdSpellId) {
            await prisma.spell.deleteMany({ where: { id: createdSpellId } });
        }
        await prisma.spell.deleteMany({ where: { name: { contains: 'Testovací Ohnivá Koule' } } });
        await prisma.user.deleteMany({ where: { email: 'spelladmin@caroteka.cz' } });
        await prisma.$disconnect();
    });

    it('POST /spells', async () => {
        const res = await request(app)
            .post('/spells')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: uniqueSpellName,
                source: 'Player Handbook',
                level: 3,
                school: 'Evocation',
                data: { damage: '8d6' }
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.name).toBe(uniqueSpellName);
        createdSpellId = res.body.data.id;
    });

    it('GET /spells', async () => {
        const res = await request(app).get('/spells?limit=1');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('GET /spells/:id', async () => {
        if (!createdSpellId) return;

        const res = await request(app).get(`/spells/${createdSpellId}`);
        expect(res.statusCode).toBe(200);

        expect(res.body.id).toBe(createdSpellId);
    });

    it('DELETE /spells/:id', async () => {
        if (!createdSpellId) return;

        const res = await request(app)
            .delete(`/spells/${createdSpellId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toBe(200);

        const checkRes = await request(app).get(`/spells/${createdSpellId}`);
        expect(checkRes.statusCode).toBe(404);
    });
});