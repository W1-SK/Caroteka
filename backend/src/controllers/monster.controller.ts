import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const getMonsters = async (req: Request, res: Response) => {
    try {
        const { name, source, cr, type, page = '1', limit = '50' } = req.query;

        const where: any = {};
        if (name) where.name = { contains: String(name), mode: 'insensitive' };
        if (source) where.source = String(source);
        if (cr) where.cr = String(cr);
        if (type) where.type = { contains: String(type), mode: 'insensitive' };

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        const [monsters, total] = await Promise.all([
            prisma.monster.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
            prisma.monster.count({ where })
        ]);

        res.json({ data: monsters, meta: { total, page: Number(page), limit: take } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch monsters' });
    }
};

export const createMonster = async (req: AuthRequest, res: Response) => {
    try {

        if (req.user?.role === 'USER') {
            return res.status(403).json({ error: 'Pro tvorbu homebrew potřebuješ roli HOMEBREW nebo ADMIN.' });
        }

        const { name, source, cr, type, data } = req.body;
        const newMonster = await prisma.monster.create({
            data: {
                name,
                source,
                cr,
                type,
                data: data || {},
                authorId: req.user?.userId
            }
        });
        res.status(201).json({ message: 'Monster created successfully', data: newMonster });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create monster' });
    }
};

export const deleteMonster = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const monster = await prisma.monster.findUnique({ where: { id } });

        if (!monster) return res.status(404).json({ error: 'Monster not found' });


        const isOwner = monster.authorId === req.user?.userId;
        const isAdmin = req.user?.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: 'Můžeš mazat jen svá vlastní monstra (pokud nejsi admin).' });
        }

        await prisma.monster.delete({ where: { id } });
        res.json({ message: 'Monster deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete monster' });
    }
};