import { inject, Injectable, signal } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiResponse, CreateTask, Task, TaskType, UpdateTask } from "@core/models/models";
import { TaskTypeService } from "@infrastructure/services/task-type.service";
import { TaskService } from "@infrastructure/services/task.service";
import { finalize, first, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskFacade {
    private readonly taskApi = inject(TaskService);
    private readonly snackBar = inject(MatSnackBar);
    private readonly taskTypeApi = inject(TaskTypeService);

    private readonly _tasks = signal<Task[]>([]);
    private readonly _taskTypes = signal<TaskType[]>([]);
    private readonly _isLoading = signal<boolean>(false);

    public readonly tasks = this._tasks.asReadonly();
    public readonly taskTypes = this._taskTypes.asReadonly();
    public readonly isLoading = this._isLoading.asReadonly();

    public loadTasks(): void {
        this._isLoading.set(true);
        this.taskApi.getAll().pipe(
            first(),
            tap((response: ApiResponse<Task[]>) => {
                if (response.data) {
                    this._tasks.set(response.data);
                }
            }),
            finalize(() => this._isLoading.set(false))
        ).subscribe();
    }

    public loadTaskTypes(): void {
        this._isLoading.set(true);
        this.taskTypeApi.getAll().pipe(
            first(),
            tap((response: ApiResponse<TaskType[]>) => {
                if (response.data) {
                    this._taskTypes.set(response.data);
                }
            }),
            finalize(() => this._isLoading.set(false))
        ).subscribe();
    }

    public createTask(data: CreateTask): Observable<ApiResponse<Task>> {
        this._isLoading.set(true);
        return this.taskApi.create(data).pipe(
            tap(() => {
                this.showSuccessMessage('Tarea creada exitosamente');
                this.loadTasks();
            }),
            finalize(() => this._isLoading.set(false))
        );
    }

    public updateTask(id: string, data: UpdateTask): Observable<ApiResponse<Task>> {
        this._isLoading.set(true);
        this._tasks.update(currentTasks =>
            currentTasks.map(task => task.id === id ? { ...task, ...data } : task)
        );

        return this.taskApi.update(id, data).pipe(
            tap(() => this.showSuccessMessage('Tarea actualizada')),
            finalize(() => this._isLoading.set(false))
        );
    }

    public deleteTask(id: string): Observable<ApiResponse<null>> {
        this._isLoading.set(true);
        this._tasks.update(currentTasks => currentTasks.filter(task => task.id !== id));

        return this.taskApi.delete(id).pipe(
            tap(() => this.showSuccessMessage('Tarea eliminada')),
            finalize(() => this._isLoading.set(false))
        );
    }

    private showSuccessMessage(message: string): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
        });
    }
}