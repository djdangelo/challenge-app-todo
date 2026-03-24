import { onRequest } from 'firebase-functions/v2/https';
import express, { Application } from 'express';
import cors from 'cors';
import { router as apiRoutes } from '@presentation/routes';
import { swaggerSpec } from '@infrastructure/swagger/swagger.config';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'development') {
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Servidor de desarrollo corriendo en http://localhost:${process.env.PORT}`);
        console.log(`📚 Documentación Swagger en http://localhost:${process.env.PORT}/api-docs`);
    });
}

export const api = onRequest(app);