import { TaskTypeDTO } from "@application/dtos/TaskType/TaskTypeDTO";
import { TaskType } from "@domain/entities/TaskType";
import { ITaskTypeRepository } from "@domain/repositories/ITaskTypeRepsoitory";

export class CreateTaskTypeUseCase {
    constructor(
        private readonly taskTypeRepository: ITaskTypeRepository
    ) { }

    async execute(taskType: TaskTypeDTO): Promise<TaskType> {
        const taskTypeEntity = new TaskType(taskType.name, taskType.color);
        return this.taskTypeRepository.create(taskTypeEntity);
    }
}