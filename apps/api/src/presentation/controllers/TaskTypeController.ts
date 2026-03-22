import { Response } from 'express';
import { AuthenticatedRequest } from '@presentation/interfaces/AuthenticatedRequest';
import { DependencyFactory } from '@infrastructure/di/DependencyFactory';
import { DynamicResponseMessage } from '@presentation/helpers/DynamicResponseMessage';

export class TaskTypeController {

    public async getAll(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const useCase = DependencyFactory.getGetTasksTypeUseCase();
            const taskTypes = await useCase.execute();

            const response = DynamicResponseMessage.Ok(taskTypes, 'Tipos de tarea obtenidos exitosamente.');
            return res.status(response.status).json(response);
        } catch (error: unknown) {
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }

    public async create(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const useCase = DependencyFactory.getCreateTaskTypeUseCase();
            const taskType = await useCase.execute(req.body);

            const response = DynamicResponseMessage.Created(taskType, 'Tipo de tarea creado exitosamente.');
            return res.status(response.status).json(response);
        } catch (error: unknown) {
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }

    public async update(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const useCase = DependencyFactory.getUpdateTaskTypeUseCase();
            const updatedTaskType = await useCase.execute(id as string, req.body);

            const response = DynamicResponseMessage.Ok(updatedTaskType, 'Tipo de tarea actualizado exitosamente.');
            return res.status(response.status).json(response);
        } catch (error: unknown) {
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }

    public async delete(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const useCase = DependencyFactory.getDeleteTaskTypeUseCase();
            await useCase.execute(id as string);

            const response = DynamicResponseMessage.Ok(null, 'Tipo de tarea eliminado exitosamente.');
            return res.status(response.status).json(response);
        } catch (error: unknown) {
            const errorResponse = DynamicResponseMessage.InternalError<null>(error instanceof Error ? error.message : 'Error interno del servidor');
            return res.status(errorResponse.status).json(errorResponse);
        }
    }
}