import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMonsters = async (req: Request, res: Response) => {
    try {
        const { name, source, cr, page = '1', limit = '50' } = req.query;
        const where: any = {};
        if (name) where.name = { contains: String(name), mode: 'insensitive' };
        if (source) where.source = String(source);
        if (cr) where.cr = String(cr);

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        const [monsters, total] = await Promise.all([
            prisma.monster.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
            prisma.monster.count({ where })
        ]);

        res.json({ data: monsters, meta: { total, page: Number(page), limit: take } });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch monsters' }); }
};

export const createMonster = async (req: Request, res: Response) => {
    try {
        const newMonster = await prisma.monster.create({ data: req.body });
        res.status(201).json(newMonster);
    } catch (error) { res.status(500).json({ error: 'Failed to create monster' }); }
};

export const deleteMonster = async (req: Request, res: Response) => {
    try {
        await prisma.monster.delete({ where: { id: req.params.id } });
        res.json({ message: 'Monster deleted' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete monster' }); }
};