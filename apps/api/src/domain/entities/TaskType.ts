import { randomUUID } from 'crypto';

export class TaskType {
    public readonly id: string;
    public name: string;
    public color?: string;

    constructor(
        name: string,
        color?: string,
        id?: string
    ) {
        this.id = id || randomUUID();
        this.name = name;
        this.color = color;
    }
}