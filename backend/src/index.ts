import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import { apiReference } from '@scalar/express-api-reference';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date() });
});

app.use('/', apiRoutes);

const openApiSpec = {
    openapi: '3.1.0',
    info: {
        title: 'Čarotéka API',
        version: '1.1.0',
        description: 'Kompletní API pro D&D aplikaci Čarotéka.',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{ bearerAuth: [] }],
    paths: {
        '/health': {
            get: { summary: 'Health check API', responses: { '200': { description: 'API běží' } } }
        },
        '/auth/register': {
            post: {
                summary: 'Registrace uživatele',
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string', format: 'email' }, password: { type: 'string', minLength: 6 } }, required: ['email', 'password'] } } }
                },
                responses: { '201': { description: 'Uživatel úspěšně vytvořen (Role: USER)' }, '400': { description: 'Chyba validace' } }
            }
        },
        '/auth/login': {
            post: {
                summary: 'Přihlášení uživatele',
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string', format: 'email' }, password: { type: 'string' } }, required: ['email', 'password'] } } }
                },
                responses: { '200': { description: 'Vrací JWT token obsahující ID a Roli' }, '401': { description: 'Neplatné údaje' } }
            }
        },
        '/users': {
            get: {
                summary: 'Seznam uživatelů (Pouze ADMIN)',
                tags: ['Admin Panel'],
                responses: {
                    '200': { description: 'Seznam uživatelů' },
                    '403': { description: 'Nejsi ADMIN' }
                }
            }
        },
        '/users/{id}/role': {
            patch: {
                summary: 'Změna role uživatele (Pouze ADMIN)',
                tags: ['Admin Panel'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    role: { type: 'string', enum: ['USER', 'HOMEBREW', 'ADMIN'] }
                                },
                                required: ['role']
                            }
                        }
                    }
                },
                responses: {
                    '200': { description: 'Role změněna' },
                    '403': { description: 'Nejsi ADMIN' },
                    '404': { description: 'Uživatel nenalezen' }
                }
            }
        },
        '/spells': {
            get: {
                summary: 'Získat seznam kouzel',
                tags: ['Spells'],
                parameters: [
                    { name: 'name', in: 'query', schema: { type: 'string' } },
                    { name: 'level', in: 'query', schema: { type: 'string' } },
                    { name: 'page', in: 'query', schema: { type: 'string', default: '1' } },
                    { name: 'limit', in: 'query', schema: { type: 'string', default: '50' } }
                ],
                responses: { '200': { description: 'Paginovaný seznam' } }
            },
            post: {
                summary: 'Vytvořit kouzlo (Vyžaduje roli HOMEBREW nebo ADMIN)',
                tags: ['Spells'],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, source: { type: 'string' }, level: { type: 'integer' }, school: { type: 'string' }, data: { type: 'object' } }, required: ['name', 'source', 'level'] } } }
                },
                responses: { '201': { description: 'Vytvořeno' }, '400': { description: 'Chyba Zod validace' }, '401': { description: 'Chybí token' }, '403': { description: 'Nedostatečná práva (Role USER)' } }
            }
        },
        '/spells/{id}': {
            get: {
                summary: 'Detail kouzla',
                tags: ['Spells'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Nalezeno' } }
            },
            delete: {
                summary: 'Smazat kouzlo (Pouze Vlastník nebo ADMIN)',
                tags: ['Spells'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Smazáno' }, '401': { description: 'Chybí token' }, '403': { description: 'Nejsi autor ani ADMIN' } }
            }
        },
        '/monsters': {
            get: {
                summary: 'Získat seznam monster',
                tags: ['Monsters'],
                responses: { '200': { description: 'Paginovaný seznam' } }
            },
            post: {
                summary: 'Vytvořit monstrum (Vyžaduje roli HOMEBREW nebo ADMIN)',
                tags: ['Monsters'],
                responses: { '201': { description: 'Vytvořeno' }, '403': { description: 'Nedostatečná práva' } }
            }
        },
        '/monsters/{id}': {
            delete: {
                summary: 'Smazat monstrum (Pouze Vlastník nebo ADMIN)',
                tags: ['Monsters'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Smazáno' }, '403': { description: 'Nejsi autor ani ADMIN' } }
            }
        },
        '/items': {
            get: {
                summary: 'Získat seznam předmětů',
                tags: ['Items'],
                responses: { '200': { description: 'Paginovaný seznam' } }
            },
            post: {
                summary: 'Vytvořit předmět (Vyžaduje roli HOMEBREW nebo ADMIN)',
                tags: ['Items'],
                responses: { '201': { description: 'Vytvořeno' }, '403': { description: 'Nedostatečná práva' } }
            }
        },
        '/items/{id}': {
            delete: {
                summary: 'Smazat předmět (Pouze Vlastník nebo ADMIN)',
                tags: ['Items'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Smazáno' }, '403': { description: 'Nejsi autor ani ADMIN' } }
            }
        },
        '/classes': {
            get: {
                summary: 'Získat seznam tříd',
                tags: ['Classes'],
                responses: { '200': { description: 'Seznam' } }
            },
            post: {
                summary: 'Vytvořit třídu (Vyžaduje roli HOMEBREW nebo ADMIN)',
                tags: ['Classes'],
                responses: { '201': { description: 'Vytvořeno' }, '403': { description: 'Nedostatečná práva' } }
            }
        },
        '/classes/{id}': {
            delete: {
                summary: 'Smazat třídu (Pouze Vlastník nebo ADMIN)',
                tags: ['Classes'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Smazáno' }, '403': { description: 'Nejsi autor ani ADMIN' } }
            }
        }
    }
};

app.use(
    '/docs',
    apiReference({
        spec: {
            content: openApiSpec,
        },
        theme: 'purple',
        layout: 'modern'
    })
);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;