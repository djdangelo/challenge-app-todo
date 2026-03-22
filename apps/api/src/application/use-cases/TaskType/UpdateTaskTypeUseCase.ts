import { TaskTypeDTO } from "@application/dtos/TaskType/TaskTypeDTO";
import { TaskType } from "@domain/entities/TaskType";
import { ITaskTypeRepository } from "@domain/repositories/ITaskTypeRepsoitory";

export class UpdateTaskTypeUseCase {
    constructor(
        private readonly taskTypeRepository: ITaskTypeRepository
    ) { }

    async execute(id: string, taskType: TaskTypeDTO): Promise<TaskType> {
        const taskTypeExists = await this.taskTypeRepository.findById(id);
        if (!taskTypeExists) throw new Error('Tipo de tarea no encontrado');
        return this.taskTypeRepository.update(id, taskType);
    }
}