import { ITaskRepository } from '@domain/repositories/ITaskRepository';
import { Task } from '@domain/entities/Task';
import { db } from '../../config/firebase';

export class FirestoreTaskRepository implements ITaskRepository {
    private readonly collection = db.collection('tasks');

    async create(task: Task): Promise<Task> {
        const taskData = {
            id: task.id,
            title: task.title,
            description: task.description,
            isCompleted: task.isCompleted,
            createdAt: task.createdAt,
            userId: task.userId,
            taskTypeId: task.taskTypeId
        };

        await this.collection.doc(task.id).set(taskData);
        return task;
    }

    async findById(id: string): Promise<Task | null> {
        const doc = await this.collection.doc(id).get();

        if (!doc.exists) return null;

        const data = doc.data();
        if (!data) return null;

        return new Task(
            data.title,
            data.description,
            data.userId,
            data.taskTypeId,
            data.createdAt.toDate(),
            data.isCompleted,
            data.id
        );
    }

    async findAll(): Promise<Task[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return new Task(
                data.title,
                data.description,
                data.userId,
                data.taskTypeId,
                data.createdAt.toDate(),
                data.isCompleted,
                data.id
            );
        });
    }

    async findByUserId(userId: string): Promise<Task[]> {
        const snapshot = await this.collection
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return new Task(
                data.title,
                data.description,
                data.userId,
                data.taskTypeId,
                data.createdAt.toDate(),
                data.isCompleted,
                data.id
            );
        });
    }

    async update(id: string, taskData: Partial<Task>): Promise<Task> {
        await this.collection.doc(id).update({ ...taskData });

        const updatedTask = await this.findById(id);
        if (!updatedTask) throw new Error('Error al recuperar la tarea actualizada');

        return updatedTask;
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}