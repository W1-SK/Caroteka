import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const getClasses = async (req: Request, res: Response) => {
    try {
        const classes = await prisma.class.findMany({ orderBy: { name: 'asc' } });
        res.json({ data: classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch classes' });
    }
};

export const createClass = async (req: AuthRequest, res: Response) => {
    try {
        if (req.user?.role === 'USER') {
            return res.status(403).json({ error: 'Pro tvorbu homebrew potřebuješ roli HOMEBREW nebo ADMIN.' });
        }

        const { name, source, data } = req.body;
        const newClass = await prisma.class.create({
            data: {
                name, source, data: data || {},
                authorId: req.user?.userId
            }
        });
        res.status(201).json({ message: 'Class created successfully', data: newClass });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create class' });
    }
};

export const deleteClass = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const cls = await prisma.class.findUnique({ where: { id } });

        if (!cls) return res.status(404).json({ error: 'Class not found' });

        const isOwner = cls.authorId === req.user?.userId;
        const isAdmin = req.user?.role === 'ADMIN';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: 'Můžeš mazat jen své vlastní třídy (pokud nejsi admin).' });
        }

        await prisma.class.delete({ where: { id } });
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete class' });
    }
};