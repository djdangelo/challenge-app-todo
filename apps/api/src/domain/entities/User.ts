import { randomUUID } from 'crypto';

export class User {
    public readonly id: string;
    public email: string;

    constructor(
        email: string,
        id?: string
    ) {
        this.id = id || randomUUID();
        this.email = email;
    }
}