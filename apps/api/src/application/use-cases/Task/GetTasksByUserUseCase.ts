import { ITaskRepository } from '@domain/repositories/ITaskRepository';
import { Task } from '@domain/entities/Task';

export class GetTasksByUserUseCase {
    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(userId: string): Promise<Task[]> {
        if (!userId) {
            throw new Error('El ID del usuario es requerido para obtener las tareas.');
        }
        return await this.taskRepository.findByUserId(userId);
    }
}