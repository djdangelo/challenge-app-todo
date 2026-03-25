import { onRequest } from 'firebase-functions/v2/https';
import express, { Application } from 'express';
import { router as apiRoutes } from '@presentation/routes';
import { swaggerSpec } from '@infrastructure/swagger/swagger.config';
import swaggerUi from 'swagger-ui-express';
import { securityCors, globalLimiter } from '@presentation/middlewares/SecurityMiddleware';
import { DynamicResponseMessage } from '@presentation/helpers/DynamicResponseMessage';

const app: Application = express();

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
        console.log(`🚀 Servidor de desarrollo corriendo en http://localhost:${process.env.PORT}`);
        console.log(`📚 Documentación Swagger en http://localhost:${process.env.PORT}/api-docs`);
    });
}

export const api = onRequest(app);