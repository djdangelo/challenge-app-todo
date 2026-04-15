import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { logger } from '@infrastructure/config/logger';

const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:3000',
    'https://todo-task-824ef.web.app',
    'https://todo-task-824ef.firebaseapp.com'
];

export const securityCors = cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            logger.warn({ origin }, 'Bloqueado por CORS: Origen no permitido');
            callback(new Error('Bloqueado por CORS: Origen no permitido'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
});

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        message: 'Demasiadas peticiones desde esta IP. Por favor, intenta de nuevo en 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: {
        status: 429,
        message: 'Demasiados intentos de inicio de sesión. Cuenta bloqueada temporalmente por 1 hora.'
    }
});