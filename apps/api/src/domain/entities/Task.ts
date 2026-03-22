import { randomUUID } from 'crypto';

export class Task {
    public readonly id: string;
    public title: string;
    public description: string;
    public userId: string;
    public createdAt?: Date;
    public isCompleted: boolean;
    public taskTypeId: string;

    constructor(
        title: string,
        description: string,
        userId: string,
        taskTypeId: string,
        createdAt?: Date,
        isCompleted: boolean = false,
        id?: string
    ) {
        this.id = id || randomUUID();
        this.title = title;
        this.description = description;
        this.createdAt = createdAt || new Date();
        this.isCompleted = isCompleted;
        this.userId = userId;
        this.taskTypeId = taskTypeId
    }

    public markAsCompleted(): void {
        this.isCompleted = true;
    }
}