import { ITaskRepository } from '@domain/repositories/ITaskRepository';

export class DeleteTaskUseCase {
    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(taskId: string): Promise<void> {
        const existingTask = await this.taskRepository.findById(taskId);
        if (!existingTask) throw new Error(`No se puede eliminar: la tarea con el ID ${taskId} no existe.`);

        await this.taskRepository.delete(taskId);
    }
}