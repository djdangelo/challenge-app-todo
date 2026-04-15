import { ITaskRepository } from '@domain/repositories/ITaskRepository';

export class DeleteTaskUseCase {
    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(taskId: string, requestId: string): Promise<void> {
        const existingTask = await this.taskRepository.findById(taskId);
        if (!existingTask) throw new Error(`NOT_FOUND`);
        if (existingTask.userId !== requestId) throw new Error(`FORBIDDEN`);

        await this.taskRepository.delete(taskId);
    }
}