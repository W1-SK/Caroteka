import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { apiReference } from '@scalar/express-api-reference';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-mvp-key-change-me-later';

app.use(cors());
app.use(express.json());

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// --- SPELLS ---
app.get('/spells', async (req, res) => {
  try {
    const { name, source, level, page = '1', limit = '50' } = req.query;
    
   
    const where: any = {};
    if (name) where.name = { contains: String(name), mode: 'insensitive' };
    if (source) where.source = String(source);
    if (level) where.level = Number(level);

   
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [spells, total] = await Promise.all([
      prisma.spell.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
      prisma.spell.count({ where })
    ]);

    res.json({ data: spells, meta: { total, page: Number(page), limit: take } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch spells' });
  }
});

app.get('/spells/:id', async (req, res) => {
  try {
    const spell = await prisma.spell.findUnique({ where: { id: req.params.id } });
    if (!spell) return res.status(404).json({ error: 'Spell not found' });
    res.json(spell);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch spell' });
  }
});

// --- MONSTERS ---
app.get('/monsters', async (req, res) => {
  try {
    const { name, source, cr, page = '1', limit = '50' } = req.query;
    const where: any = {};
    if (name) where.name = { contains: String(name), mode: 'insensitive' };
    if (source) where.source = String(source);
    if (cr) where.cr = String(cr);

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const monsters = await prisma.monster.findMany({ where, skip, take, orderBy: { name: 'asc' } });
    res.json({ data: monsters });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch monsters' });
  }
});

// --- CLASSES ---
app.get('/classes', async (req, res) => {
  try {
    const classes = await prisma.class.findMany({ orderBy: { name: 'asc' } });
    res.json({ data: classes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

// --- ITEMS ---
app.get('/items', async (req, res) => {
  try {
    const { name, source, type, page = '1', limit = '50' } = req.query;
    const where: any = {};
    if (name) where.name = { contains: String(name), mode: 'insensitive' };
    if (source) where.source = String(source);
    if (type) where.type = String(type);

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const items = await prisma.item.findMany({ where, skip, take, orderBy: { name: 'asc' } });
    res.json({ data: items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// --- SCALAR DOCS ---
const openApiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'Čarotéka API',
    version: '1.0.0',
    description: 'API pro Čarotéka (Kouzla, Monstra, Předměty, Třídy)',
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
  paths: {
    '/health': {
      get: { summary: 'Health check', responses: { '200': { description: 'OK' } } }
    },
    '/auth/register': {
      post: {
        summary: 'Registrace uživatele',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } } } }
        },
        responses: { '201': { description: 'User created' } }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Přihlášení uživatele',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } } } }
        },
        responses: { '200': { description: 'Vrací JWT token' } }
      }
    },
    '/spells': {
      get: {
        summary: 'Seznam kouzel',
        parameters: [
          { name: 'name', in: 'query', schema: { type: 'string' }, description: 'Hledání podle jména' },
          { name: 'level', in: 'query', schema: { type: 'integer' }, description: 'Level kouzla' },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 50 } }
        ],
        responses: { '200': { description: 'Paginovaný seznam kouzel' } }
      }
    },
    '/spells/{id}': {
      get: {
        summary: 'Detail kouzla',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Detail jednoho kouzla' } }
      }
    },
    '/monsters': {
      get: {
        summary: 'Seznam monster',
        parameters: [
          { name: 'name', in: 'query', schema: { type: 'string' } },
          { name: 'cr', in: 'query', schema: { type: 'string' }, description: 'Challenge Rating (např. "1/4", "1")' },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }
        ],
        responses: { '200': { description: 'Seznam monster' } }
      }
    },
    '/items': {
      get: {
        summary: 'Seznam předmětů',
        parameters: [
          { name: 'name', in: 'query', schema: { type: 'string' } },
          { name: 'type', in: 'query', schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Seznam předmětů' } }
      }
    },
    '/classes': {
      get: {
        summary: 'Seznam tříd',
        responses: { '200': { description: 'Seznam všech herních tříd' } }
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
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});