import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserToken } from '../helpers/jwt';

declare module 'express' {
    interface Request {
        user?: UserToken;
    }
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    if (!token) return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
    });

    const secret: string = `${process.env.JWT_SECRET}`;

    try {

        const payload = <jwt.JwtPayload>jwt.verify(token, secret);
        const user: UserToken = {
            id: payload.id,
            name: payload.name,
            lastName: payload.lastName,
            email: payload.email,
            role: payload.role,
            status: payload.status,
            firstLogin: payload.firstLogin,
            attempts: payload.attempts
        }
        req.user = user;

    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: 'Token invalid'
        });
    }
    next();
}