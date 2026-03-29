import request from 'supertest';
import { PrismaClient } from '@prisma/client';

jest.mock('@scalar/express-api-reference', () => ({
    apiReference: () => (req: any, res: any, next: any) => next()
}));

import app from '../index';

const prisma = new PrismaClient();

describe('Classes API CRUD Tests', () => {
    let adminToken: string;
    let createdClassId: string;
    const uniqueClassName = `Testovací Bojovník ${Date.now()}`;

    beforeAll(async () => {
        await prisma.user.deleteMany({ where: { email: 'classadmin@caroteka.cz' } });
        await request(app).post('/auth/register').send({ email: 'classadmin@caroteka.cz', password: 'password123' });

        await prisma.user.update({
            where: { email: 'classadmin@caroteka.cz' },
            data: { role: 'ADMIN' }
        });

        const res = await request(app).post('/auth/login').send({ email: 'classadmin@caroteka.cz', password: 'password123' });
        adminToken = res.body.token;
    });

    afterAll(async () => {
        if (createdClassId) {
            await prisma.class.deleteMany({ where: { id: createdClassId } });
        }
        await prisma.class.deleteMany({ where: { name: { contains: 'Testovací Bojovník' } } });
        await prisma.user.deleteMany({ where: { email: 'classadmin@caroteka.cz' } });
        await prisma.$disconnect();
    });

    it('POST /classes', async () => {
        const res = await request(app)
            .post('/classes')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: uniqueClassName,
                source: 'Player Handbook',
                hitDice: 'd10',
                data: { primaryAbility: 'Strength' }
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.name).toBe(uniqueClassName);
        createdClassId = res.body.data.id;
    });

    it('GET /classes', async () => {
        const res = await request(app).get('/classes?limit=1');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('DELETE /classes/:id', async () => {
        if (!createdClassId) return;

        const res = await request(app)
            .delete(`/classes/${createdClassId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toBe(200);
    });
});