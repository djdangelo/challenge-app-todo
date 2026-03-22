import { TaskType } from "@domain/entities/TaskType";
import { ITaskTypeRepository } from "@domain/repositories/ITaskTypeRepsoitory";

export class GetTasksTypeUseCase {
    constructor(
        private readonly taskTypeRepository: ITaskTypeRepository
    ) { }

    async execute(): Promise<TaskType[]> {
        return await this.taskTypeRepository.findAll();
    }
}