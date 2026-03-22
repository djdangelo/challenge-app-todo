import { ITaskRepository } from '@domain/repositories/ITaskRepository';
import { Task } from '@domain/entities/Task';
import { CreateTaskDTO } from '@application/dtos/Task/CreateTaskDTO';

export class CreateTaskUseCase {
    constructor(private readonly taskRepository: ITaskRepository) { }

    async execute(data: CreateTaskDTO): Promise<Task> {

        const newTask = new Task(
            data.title,
            data.description,
            data.userId,
            data.taskTypeId,
            new Date(),
            false,
        );

        return await this.taskRepository.create(newTask);
    }
}