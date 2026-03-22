import { ITaskTypeRepository } from "@domain/repositories/ITaskTypeRepsoitory";

export class DeleteTaskTypeUseCase {
    constructor(
        private readonly taskTypeRepository: ITaskTypeRepository
    ) { }

    async execute(id: string): Promise<void> {
        const taskTypeExists = await this.taskTypeRepository.findById(id);
        if (!taskTypeExists) throw new Error('Tipo de tarea no encontrado');
        await this.taskTypeRepository.delete(id);
    }
}