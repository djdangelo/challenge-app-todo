import { Request, Response } from 'express';
import { DependencyFactory } from '@infrastructure/di/DependencyFactory';
import { DynamicResponseMessage } from '@presentation/helpers/DynamicResponseMessage';
import { JwtService } from '@infrastructure/auth/JwtService';

export class UserController {

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body;

            if (!email) {
                const errorResponse = DynamicResponseMessage.BadRequest<null>('El correo es requerido.');
                return res.status(errorResponse.status).json(errorResponse);
            }

            const checkUserUseCase = DependencyFactory.getCheckUserUseCase();
            const user = await checkUserUseCase.execute(email);
            if (!user) {
                const notFoundResponse = DynamicResponseMessage.NotFound<null>('Usuario no encontrado. Se requiere confirmación para crearlo.');
                return res.status(notFoundResponse.status).json(notFoundResponse);
            }

            const token = JwtService.generateToken(user.id, user.email);

            const successResponse = DynamicResponseMessage.Ok(
                { user, token },
                'Inicio de sesión exitoso.'
            );

            return res.status(successResponse.status).json(successResponse);

        } catch (error: unknown) {
            const serverError = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(serverError.status).json(serverError);
        }
    }

    public async register(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body;

            if (!email) {
                const errorResponse = DynamicResponseMessage.BadRequest<null>('El correo es requerido.');
                return res.status(errorResponse.status).json(errorResponse);
            }

            const createUserUseCase = DependencyFactory.getCreateUserUseCase();
            const newUser = await createUserUseCase.execute(email);

            const token = JwtService.generateToken(newUser.id, newUser.email);

            const createdResponse = DynamicResponseMessage.Created(
                { user: newUser, token },
                'Usuario creado e iniciada la sesión exitosamente.'
            );

            return res.status(createdResponse.status).json(createdResponse);

        } catch (error: unknown) {
            const badRequestResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(badRequestResponse.status).json(badRequestResponse);
        }
    }
}