import { onRequest } from 'firebase-functions/v2/https';
import express, { Application } from 'express';
import { router as apiRoutes } from '@presentation/routes';
import { swaggerSpec } from '@infrastructure/swagger/swagger.config';
import swaggerUi from 'swagger-ui-express';
import { securityCors, globalLimiter } from '@presentation/middlewares/SecurityMiddleware';
import { DynamicResponseMessage } from '@presentation/helpers/DynamicResponseMessage';
import { logger } from '@infrastructure/config/logger';
import pinoHttp from 'pino-http';
import { defineSecret } from 'firebase-functions/params';

const app: Application = express();
const jwtSecret = defineSecret('JWT_SECRET');

app.use(pinoHttp({
    logger,
    customLogLevel: (req, res, err) => {
        if (res.statusCode >= 500 || err) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
    }
}));

app.use(securityCors);
app.use(globalLimiter);
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('', apiRoutes);
app.use(/.*/, (_req, res) => {
    const authError = DynamicResponseMessage.Unauthorized<null>('No tienes permiso para esta ruta.');
    res.status(authError.status).json(authError);
});

if (process.env.NODE_ENV === 'development') {
    app.listen(process.env.PORT, () => {
        logger.info(`Servidor de desarrollo corriendo en http://localhost:${process.env.PORT}`);
        logger.info(`Documentacion Swagger en http://localhost:${process.env.PORT}/api-docs`);
    });
}

export const api = onRequest({
    region: 'us-central1',
    memory: '256MiB',
    concurrency: 80,
    maxInstances: 10,
    secrets: [jwtSecret]
}, app);