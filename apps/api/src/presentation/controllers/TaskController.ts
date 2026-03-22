import { Response } from 'express';
import { AuthenticatedRequest } from '@presentation/interfaces/AuthenticatedRequest';
import { DependencyFactory } from '@infrastructure/di/DependencyFactory';
import { DynamicResponseMessage } from '@presentation/helpers/DynamicResponseMessage';

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
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }

    public async update(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const useCase = DependencyFactory.getUpdateTaskUseCase();
            const updatedTask = await useCase.execute(id as string, updateData);

            const response = DynamicResponseMessage.Ok(updatedTask, 'Tarea actualizada exitosamente.');
            return res.status(response.status).json(response);
        } catch (error: unknown) {
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }

    public async delete(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const useCase = DependencyFactory.getDeleteTaskUseCase();
            await useCase.execute(id as string);

            const response = DynamicResponseMessage.Ok(null, 'Tarea eliminada exitosamente.');
            return res.status(response.status).json(response);
        } catch (error: unknown) {
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }
}