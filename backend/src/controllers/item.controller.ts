import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getItems = async (req: Request, res: Response) => {
    try {
        const { name, source, type, page = '1', limit = '50' } = req.query;
        const where: any = {};
        if (name) where.name = { contains: String(name), mode: 'insensitive' };
        if (source) where.source = String(source);
        if (type) where.type = String(type);

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        const [items, total] = await Promise.all([
            prisma.item.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
            prisma.item.count({ where })
        ]);

        res.json({ data: items, meta: { total, page: Number(page), limit: take } });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch items' }); }
};

export const createItem = async (req: Request, res: Response) => {
    try {
        const newItem = await prisma.item.create({ data: req.body });
        res.status(201).json(newItem);
    } catch (error) { res.status(500).json({ error: 'Failed to create item' }); }
};

export const deleteItem = async (req: Request, res: Response) => {
    try {
        await prisma.item.delete({ where: { id: req.params.id } });
        res.json({ message: 'Item deleted' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete item' }); }
};