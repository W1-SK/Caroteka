import request from 'supertest';

jest.mock('@scalar/express-api-reference', () => ({
    apiReference: () => (req: any, res: any, next: any) => next()
}));

import app from '../index';

describe('Auth Endpoints & Validation', () => {

    it('Měl by vyhodit chybu 400, pokud je heslo moc krátké (Zod Validace)', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                email: 'test@spatneheslo.cz',
                password: '123'
            });

        expect(res.statusCode).toBe(400);
    });

    it('Měl by vyhodit chybu 400, pokud pošleme nesmyslný email', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                email: 'tohle-neni-email',
                password: 'validniHeslo123'
            });

        expect(res.statusCode).toBe(400);
    });

});