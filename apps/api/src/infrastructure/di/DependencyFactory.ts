import { FirestoreTaskRepository } from '@infrastructure/database/repositories/FirestoreTaskRepository';
import { FirestoreUserRepository } from '@infrastructure/database/repositories/FirestoreUserRepository';
import { FirestoreTaskTypeRepository } from '@infrastructure/database/repositories/FirestoreTaskTypeRepository';
import { CreateTaskUseCase } from '@application/use-cases/Task/CreateTaskUseCase';
import { GetTasksByUserUseCase } from '@application/use-cases/Task/GetTasksByUserUseCase';
import { UpdateTaskUseCase } from '@application/use-cases/Task/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '@application/use-cases/Task/DeleteTaskUseCase';
import { CheckUserUseCase } from '@application/use-cases/User/CheckUserUseCase';
import { CreateUserUseCase } from '@application/use-cases/User/CreateUserUseCase';
import { CreateTaskTypeUseCase } from '@application/use-cases/TaskType/CreateTaskTypeUseCase';
import { UpdateTaskTypeUseCase } from '@application/use-cases/TaskType/UpdateTaskTypeUseCase';
import { DeleteTaskTypeUseCase } from '@application/use-cases/TaskType/DeleteTaskTypeUseCase';
import { GetTasksTypeUseCase } from '@application/use-cases/TaskType/GetTasksTypeUseCase';

export class DependencyFactory {
    private static taskRepositoryInstance: FirestoreTaskRepository;
    private static userRepositoryInstance: FirestoreUserRepository;
    private static taskTypeRepositoryInstance: FirestoreTaskTypeRepository;

    private constructor() { }

    private static getTaskRepository(): FirestoreTaskRepository {
        if (!this.taskRepositoryInstance) {
            this.taskRepositoryInstance = new FirestoreTaskRepository();
        }
        return this.taskRepositoryInstance;
    }

    private static getUserRepository(): FirestoreUserRepository {
        if (!this.userRepositoryInstance) {
            this.userRepositoryInstance = new FirestoreUserRepository();
        }
        return this.userRepositoryInstance;
    }

    private static getTaskTypeRepository(): FirestoreTaskTypeRepository {
        if (!this.taskTypeRepositoryInstance) {
            this.taskTypeRepositoryInstance = new FirestoreTaskTypeRepository();
        }
        return this.taskTypeRepositoryInstance;
    }

    public static getCreateTaskUseCase(): CreateTaskUseCase {
        return new CreateTaskUseCase(this.getTaskRepository());
    }

    public static getGetTasksByUserUseCase(): GetTasksByUserUseCase {
        return new GetTasksByUserUseCase(this.getTaskRepository());
    }

    public static getUpdateTaskUseCase(): UpdateTaskUseCase {
        return new UpdateTaskUseCase(this.getTaskRepository());
    }

    public static getDeleteTaskUseCase(): DeleteTaskUseCase {
        return new DeleteTaskUseCase(this.getTaskRepository());
    }

    public static getCheckUserUseCase(): CheckUserUseCase {
        return new CheckUserUseCase(this.getUserRepository());
    }

    public static getCreateUserUseCase(): CreateUserUseCase {
        return new CreateUserUseCase(this.getUserRepository());
    }

    public static getCreateTaskTypeUseCase(): CreateTaskTypeUseCase {
        return new CreateTaskTypeUseCase(this.getTaskTypeRepository());
    }

    public static getUpdateTaskTypeUseCase(): UpdateTaskTypeUseCase {
        return new UpdateTaskTypeUseCase(this.getTaskTypeRepository());
    }

    public static getDeleteTaskTypeUseCase(): DeleteTaskTypeUseCase {
        return new DeleteTaskTypeUseCase(this.getTaskTypeRepository());
    }

    public static getGetTasksTypeUseCase(): GetTasksTypeUseCase {
        return new GetTasksTypeUseCase(this.getTaskTypeRepository());
    }
}