import { Response } from 'express';
import { AuthenticatedRequest } from '@presentation/interfaces/AuthenticatedRequest';
import { DependencyFactory } from '@infrastructure/di/DependencyFactory';
import { DynamicResponseMessage } from '@presentation/helpers/DynamicResponseMessage';
import { logger } from '@infrastructure/config/logger';

export class TaskController {

    public async create(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const userId = req.user!.userId;
            const taskData = { ...req.body, userId };

            const useCase = DependencyFactory.getCreateTaskUseCase();
            const task = await useCase.execute(taskData);

            const response = DynamicResponseMessage.Created(task, 'Tarea creada exitosamente.');
            return res.status(response.status).json(response);
        } catch (error: unknown) {
            logger.error({ error }, 'Error al crear la tarea');
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }

    public async getAllByUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const userId = req.user!.userId;

            const useCase = DependencyFactory.getGetTasksByUserUseCase();
            const tasks = await useCase.execute(userId);

            const response = DynamicResponseMessage.Ok(tasks, 'Tareas obtenidas exitosamente.');
            return res.status(response.status).json(response);
        } catch (error: unknown) {
            logger.error({ error }, 'Error al obtener las tareas');
            if (error instanceof Error && error.message === 'REQUIRED_USER_ID') {
                logger.warn({ error }, 'El ID del usuario es requerido para obtener las tareas');
                const errorResponse = DynamicResponseMessage.BadRequest<null>('El ID del usuario es requerido para obtener las tareas.');
                return res.status(errorResponse.status).json(errorResponse);
            }
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }

    public async update(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const requesterId = req.user!.userId;

            const useCase = DependencyFactory.getUpdateTaskUseCase();
            const updatedTask = await useCase.execute(id as string, updateData, requesterId);

            const response = DynamicResponseMessage.Ok(updatedTask, 'Tarea actualizada exitosamente.');
            return res.status(response.status).json(response);
        } catch (error: unknown) {
            if (error instanceof Error && error.message === 'FORBIDDEN') {
                logger.warn({ error }, 'No tienes permiso para actualizar esta tarea');
                const response = DynamicResponseMessage.Forbidden<null>('No tienes permiso para actualizar esta tarea.');
                return res.status(response.status).json(response);
            }
            if (error instanceof Error && error.message === 'NOT_FOUND') {
                logger.warn({ error }, 'La tarea no existe');
                const response = DynamicResponseMessage.NotFound<null>('La tarea no existe.');
                return res.status(response.status).json(response);
            }
            logger.error({ error }, 'Error al actualizar la tarea');
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }

    public async delete(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const requesterId = req.user!.userId;

            const useCase = DependencyFactory.getDeleteTaskUseCase();
            await useCase.execute(id as string, requesterId);

            const response = DynamicResponseMessage.Ok(null, 'Tarea eliminada exitosamente.');
            return res.status(response.status).json(response);
        } catch (error: unknown) {
            if (error instanceof Error && error.message === 'FORBIDDEN') {
                logger.warn({ error }, 'No tienes permiso para eliminar esta tarea');
                const response = DynamicResponseMessage.Forbidden<null>('No tienes permiso para eliminar esta tarea.');
                return res.status(response.status).json(response);
            }
            if (error instanceof Error && error.message === 'NOT_FOUND') {
                logger.warn({ error }, 'La tarea no existe');
                const response = DynamicResponseMessage.NotFound<null>('La tarea no existe.');
                return res.status(response.status).json(response);
            }
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }
}