import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware'

const prisma = new PrismaClient();

export const getSpells = async (req: Request, res: Response) => {
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
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch spells' });
    }
};

export const getSpellById = async (req: Request, res: Response) => {
    try {
        const spell = await prisma.spell.findUnique({ where: { id: req.params.id } });
        if (!spell) return res.status(404).json({ error: 'Spell not found' });
        res.json(spell);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch spell' });
    }
};

export const createSpell = async (req: AuthRequest, res: Response) => {
    try {

        if (req.user?.role === 'USER') {
            return res.status(403).json({ error: 'Pro tvorbu homebrew potřebuješ roli HOMEBREW nebo ADMIN.' });
        }

        const { name, source, level, school, data } = req.body;
        const newSpell = await prisma.spell.create({
            data: {
                name, source, level, school: school || 'Unknown', data: data || {},
                authorId: req.user?.userId
            }
        });
        res.status(201).json({ message: 'Spell created successfully', data: newSpell });
    } catch (error) { res.status(500).json({ error: 'Failed to create spell' }); }
};

export const deleteSpell = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const spell = await prisma.spell.findUnique({ where: { id } });

        if (!spell) return res.status(404).json({ error: 'Spell not found' });

        const isOwner = spell.authorId === req.user?.userId;
        const isAdmin = req.user?.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: 'Můžeš mazat jen svá vlastní kouzla (pokud nejsi admin).' });
        }

        await prisma.spell.delete({ where: { id } });
        res.json({ message: 'Spell deleted successfully' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete spell' }); }
};