import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Pouze administrátor vidí seznam uživatelů.' });
        }

        const users = await prisma.user.findMany({
            select: { id: true, email: true, role: true, createdAt: true },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ data: users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const updateUserRole = async (req: AuthRequest, res: Response) => {
    try {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Pouze administrátor může měnit role.' });
        }

        const { id } = req.params;
        const { role } = req.body;

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ error: 'Uživatel nenalezen.' });

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { role }
        });

        res.json({
            message: 'Role úspěšně změněna',
            user: { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user role' });
    }
};