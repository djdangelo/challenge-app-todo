import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { DynamicResponseMessage } from '@presentation/helpers/DynamicResponseMessage';
import { logger } from '@infrastructure/config/logger';

export const validateSchema = (schema: ZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map(err => `${err.path.join('.')}: ${err.message}`);

                const errorResponse = DynamicResponseMessage.BadRequest<null>(
                    'Errores de validación en los datos enviados.',
                    errorMessages
                );
                logger.warn({ error }, 'Errores de validación en los datos enviados.');
                return res.status(errorResponse.status).json(errorResponse);
            }

            const serverError = DynamicResponseMessage.InternalError<null>('Error interno de validación');
            logger.error({ error }, 'Error interno de validación');
            return res.status(serverError.status).json(serverError);
        }
    };