import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const getItems = async (req: Request, res: Response) => {
    try {
        const { name, type, page = '1', limit = '50' } = req.query;

        const where: any = {};
        if (name) where.name = { contains: String(name), mode: 'insensitive' };
        if (type) where.type = String(type);

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        const [items, total] = await Promise.all([
            prisma.item.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
            prisma.item.count({ where })
        ]);

        res.json({ data: items, meta: { total, page: Number(page), limit: take } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};

export const createItem = async (req: AuthRequest, res: Response) => {
    try {
        if (req.user?.role === 'USER') {
            return res.status(403).json({ error: 'Pro tvorbu homebrew potřebuješ roli HOMEBREW nebo ADMIN.' });
        }

        const { name, source, type, rarity, data } = req.body;
        const newItem = await prisma.item.create({
            data: {
                name, source, type, rarity, data: data || {},
                authorId: req.user?.userId
            }
        });
        res.status(201).json({ message: 'Item created successfully', data: newItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
};

export const deleteItem = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const item = await prisma.item.findUnique({ where: { id } });

        if (!item) return res.status(404).json({ error: 'Item not found' });

        const isOwner = item.authorId === req.user?.userId;
        const isAdmin = req.user?.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: 'Můžeš mazat jen své vlastní předměty (pokud nejsi admin).' });
        }

        await prisma.item.delete({ where: { id } });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
};