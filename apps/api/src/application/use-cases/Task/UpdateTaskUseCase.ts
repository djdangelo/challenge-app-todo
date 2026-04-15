import { ITaskRepository } from '@domain/repositories/ITaskRepository';
import { Task } from '@domain/entities/Task';
import { UpdateTaskDTO } from '@application/dtos/Task/UpdateTaskDTO';

export class UpdateTaskUseCase {
    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(taskId: string, data: UpdateTaskDTO, requesterId: string): Promise<Task> {
        const existingTask = await this.taskRepository.findById(taskId);
        if (!existingTask) throw new Error(`NOT_FOUND`);
        if (existingTask.userId !== requesterId) throw new Error(`FORBIDDEN`);

        return await this.taskRepository.update(taskId, data);
    }
}