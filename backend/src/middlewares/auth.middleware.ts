import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
    user?: { userId: string; role: string };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const secret = process.env.JWT_SECRET || '!!ZmenMePozdeji!!!';

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) { res.status(401).json({ error: 'Access denied' }); return; }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Invalid token' });
            return;
        }
        req.user = user as { userId: string; role: string };
        next();
    });
};