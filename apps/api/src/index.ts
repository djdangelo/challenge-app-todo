import * as functions from 'firebase-functions';
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
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor de desarrollo corriendo en http://localhost:${PORT}`);
        console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
    });
}

export const api = functions.https.onRequest(app);