import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded; // Attach user info to the request
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
