import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClasses = async (req: Request, res: Response) => {
    try {
        const classes = await prisma.class.findMany({ orderBy: { name: 'asc' } });
        res.json({ data: classes });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch classes' }); }
};

export const createClass = async (req: Request, res: Response) => {
    try {
        const newClass = await prisma.class.create({ data: req.body });
        res.status(201).json(newClass);
    } catch (error) { res.status(500).json({ error: 'Failed to create class' }); }
};

export const deleteClass = async (req: Request, res: Response) => {
    try {
        await prisma.class.delete({ where: { id: req.params.id } });
        res.json({ message: 'Class deleted' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete class' }); }
};