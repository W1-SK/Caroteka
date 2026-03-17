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
        version: '1.0.0',
        description: 'Kompletní API pro D&D aplikaci Čarotéka. Obsahuje Kouzla, Monstra, Předměty a Třídy. Plně validováno přes Zod.',
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
                responses: { '201': { description: 'Uživatel úspěšně vytvořen' }, '400': { description: 'Chyba validace nebo uživatel existuje' } }
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
                responses: { '200': { description: 'Vrací JWT token pro autorizaci' }, '401': { description: 'Neplatné údaje' } }
            }
        },
        '/spells': {
            get: {
                summary: 'Získat seznam kouzel',
                tags: ['Spells'],
                parameters: [
                    { name: 'name', in: 'query', schema: { type: 'string' }, description: 'Hledání podle jména (částečná shoda)' },
                    { name: 'level', in: 'query', schema: { type: 'string' }, description: 'Level kouzla (0-9)' },
                    { name: 'page', in: 'query', schema: { type: 'string', default: '1' } },
                    { name: 'limit', in: 'query', schema: { type: 'string', default: '50' } }
                ],
                responses: { '200': { description: 'Paginovaný seznam kouzel' } }
            },
            post: {
                summary: 'Vytvořit vlastní kouzlo',
                tags: ['Spells'],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, source: { type: 'string' }, level: { type: 'integer' }, school: { type: 'string' }, data: { type: 'object' } }, required: ['name', 'source', 'level'] } } }
                },
                responses: { '201': { description: 'Kouzlo vytvořeno' }, '400': { description: 'Chyba Zod validace' } }
            }
        },
        '/spells/{id}': {
            get: {
                summary: 'Detail jednoho kouzla',
                tags: ['Spells'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Kouzlo nalezeno' }, '404': { description: 'Kouzlo nenalezeno' } }
            },
            delete: {
                summary: 'Smazat kouzlo',
                tags: ['Spells'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Kouzlo smazáno' } }
            }
        },
        '/monsters': {
            get: {
                summary: 'Získat seznam monster',
                tags: ['Monsters'],
                parameters: [
                    { name: 'name', in: 'query', schema: { type: 'string' } },
                    { name: 'cr', in: 'query', schema: { type: 'string' }, description: 'Challenge Rating (např. "1/4", "1")' },
                    { name: 'page', in: 'query', schema: { type: 'string', default: '1' } },
                    { name: 'limit', in: 'query', schema: { type: 'string', default: '50' } }
                ],
                responses: { '200': { description: 'Paginovaný seznam monster' } }
            },
            post: {
                summary: 'Vytvořit monstrum',
                tags: ['Monsters'],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, source: { type: 'string' }, cr: { type: 'string' }, type: { type: 'string' }, data: { type: 'object' } }, required: ['name', 'source'] } } }
                },
                responses: { '201': { description: 'Monstrum vytvořeno' } }
            }
        },
        '/monsters/{id}': {
            delete: {
                summary: 'Smazat monstrum',
                tags: ['Monsters'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Monstrum smazáno' } }
            }
        },
        '/items': {
            get: {
                summary: 'Získat seznam předmětů',
                tags: ['Items'],
                parameters: [
                    { name: 'name', in: 'query', schema: { type: 'string' } },
                    { name: 'type', in: 'query', schema: { type: 'string' } },
                    { name: 'page', in: 'query', schema: { type: 'string', default: '1' } },
                    { name: 'limit', in: 'query', schema: { type: 'string', default: '50' } }
                ],
                responses: { '200': { description: 'Paginovaný seznam předmětů' } }
            },
            post: {
                summary: 'Vytvořit předmět',
                tags: ['Items'],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, source: { type: 'string' }, type: { type: 'string' }, rarity: { type: 'string' }, data: { type: 'object' } }, required: ['name', 'source'] } } }
                },
                responses: { '201': { description: 'Předmět vytvořen' } }
            }
        },
        '/items/{id}': {
            delete: {
                summary: 'Smazat předmět',
                tags: ['Items'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Předmět smazán' } }
            }
        },
        '/classes': {
            get: {
                summary: 'Získat seznam tříd',
                tags: ['Classes'],
                responses: { '200': { description: 'Seznam tříd' } }
            },
            post: {
                summary: 'Vytvořit třídu',
                tags: ['Classes'],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, source: { type: 'string' }, data: { type: 'object' } }, required: ['name', 'source'] } } }
                },
                responses: { '201': { description: 'Třída vytvořena' } }
            }
        },
        '/classes/{id}': {
            delete: {
                summary: 'Smazat třídu',
                tags: ['Classes'],
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Třída smazána' } }
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});