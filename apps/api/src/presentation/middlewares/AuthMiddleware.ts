import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DynamicResponseMessage } from '@presentation/helpers/DynamicResponseMessage';
import { AuthenticatedRequest } from '@presentation/interfaces/AuthenticatedRequest';
import { logger } from '@infrastructure/config/logger';

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.warn({ authHeader }, 'Token de autenticación no proporcionado o formato inválido');
        const errorResponse = DynamicResponseMessage.Unauthorized<null>(
            'Acceso denegado. Token de autenticación no proporcionado o formato inválido.'
        );
        return res.status(errorResponse.status).json(errorResponse);
    }

    const token = authHeader.split(' ')[1];

    try {
        const secret = process.env.JWT_SECRET || 'super-secret-challenge-key';

        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

        req.user = {
            userId: decoded.sub as string,
            email: decoded.email as string
        };

        next();

    } catch (error: any) {
        logger.warn({ error }, 'Token inválido o expirado');
        const errorResponse = DynamicResponseMessage.Unauthorized<null>(
            'Acceso denegado. Token inválido o expirado.'
        );
        return res.status(errorResponse.status).json(errorResponse);
    }
};