import { ITaskRepository } from '@domain/repositories/ITaskRepository';
import { Task } from '@domain/entities/Task';

export class GetTasksByUserUseCase {
    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(userId: string): Promise<Task[]> {
        if (!userId) {
            throw new Error('REQUIRED_USER_ID');
        }
        return await this.taskRepository.findByUserId(userId);
    }
}