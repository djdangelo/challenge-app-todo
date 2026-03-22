import { ITaskTypeRepository } from '@domain/repositories/ITaskTypeRepsoitory';
import { TaskType } from '@domain/entities/TaskType';
import { db } from '../../config/firebase';

export class FirestoreTaskTypeRepository implements ITaskTypeRepository {
    private readonly collection = db.collection('taskTypes');

    async findAll(): Promise<TaskType[]> {
        const snapshot = await this.collection.get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return new TaskType(data.name, data.color, data.id);
        });
    }

    async findById(id: string): Promise<TaskType | null> {
        const doc = await this.collection.doc(id).get();

        if (!doc.exists) return null;

        const data = doc.data();
        if (!data) return null;

        return new TaskType(data.name, data.color, data.id);
    }

    async create(taskType: TaskType): Promise<TaskType> {
        const taskTypeData = {
            id: taskType.id,
            name: taskType.name,
            color: taskType.color || null
        };

        await this.collection.doc(taskType.id).set(taskTypeData);
        return taskType;
    }

    async update(id: string, taskTypeData: Partial<TaskType>): Promise<TaskType> {
        await this.collection.doc(id).update({ ...taskTypeData });

        const updatedTaskType = await this.findById(id);
        if (!updatedTaskType) throw new Error('Error al recuperar el tipo de tarea actualizado');

        return updatedTaskType;
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}