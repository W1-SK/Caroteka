import request from 'supertest';
import { PrismaClient } from '@prisma/client';

jest.mock('@scalar/express-api-reference', () => ({
    apiReference: () => (req: any, res: any, next: any) => next()
}));

import app from '../index';

const prisma = new PrismaClient();

describe('Admin Panel & Users API Tests', () => {
    let adminToken: string;
    let userToken: string;
    let standardUserId: string;
    const uniqueUserEmail = `standard-${Date.now()}@test.cz`;

    beforeAll(async () => {
        await prisma.user.deleteMany({ where: { email: 'superadmin@caroteka.cz' } });
        await request(app).post('/auth/register').send({ email: 'superadmin@caroteka.cz', password: 'password123' });

        await prisma.user.update({
            where: { email: 'superadmin@caroteka.cz' },
            data: { role: 'ADMIN' }
        });

        const adminRes = await request(app).post('/auth/login').send({ email: 'superadmin@caroteka.cz', password: 'password123' });
        adminToken = adminRes.body.token;

        await request(app).post('/auth/register').send({ email: uniqueUserEmail, password: 'password123' });
        const userRes = await request(app).post('/auth/login').send({ email: uniqueUserEmail, password: 'password123' });
        userToken = userRes.body.token;

        const userDb = await prisma.user.findUnique({ where: { email: uniqueUserEmail } });
        if (userDb) standardUserId = userDb.id;
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { email: uniqueUserEmail } });
        await prisma.user.deleteMany({ where: { email: 'superadmin@caroteka.cz' } });
        await prisma.$disconnect();
    });

    it('GET /users - Měl by zamítnout přístup běžnému uživateli (403)', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toBe(403);
    });

    it('GET /users - Měl by povolit přístup ADMINovi (200)', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toBe(200);

        const usersArray = res.body.data ? res.body.data : res.body;
        expect(Array.isArray(usersArray)).toBe(true);
    });

    it('PATCH /users/:id/role - Měl by povolit ADMINovi změnit roli', async () => {
        if (!standardUserId) return;

        const res = await request(app)
            .patch(`/users/${standardUserId}/role`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ role: 'HOMEBREW' });

        expect(res.statusCode).toBe(200);

        const checkUser = await prisma.user.findUnique({ where: { id: standardUserId } });
        expect(checkUser?.role).toBe('HOMEBREW');
    });
});