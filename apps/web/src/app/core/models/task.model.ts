export interface Task {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
    userId: string;
    taskTypeId: string;
}