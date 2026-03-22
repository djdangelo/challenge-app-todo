import { TaskType } from '@domain/entities/TaskType';

export interface ITaskTypeRepository {
    findAll(): Promise<TaskType[]>;
    findById(id: string): Promise<TaskType | null>;
    create(taskType: TaskType): Promise<TaskType>;
    update(id: string, taskType: Partial<TaskType>): Promise<TaskType>;
    delete(id: string): Promise<void>;
}