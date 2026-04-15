import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';

import { TaskFacade } from '@application/facades/task.facade';
import { Task } from '@core/models/task.model';
import { TaskDialogComponent } from '@presentation/shared/components/task-dialog/task-dialog.component';
import { CreateTask } from '@core/models/create-task.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateTask } from '@core/models/update-task.model';
import { TaskFilter } from '@core/@types/task-filter.type';
import { TaskType } from '@core/models/task-type.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatDividerModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {
  public readonly taskFacade = inject(TaskFacade);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public tasks = this.taskFacade.tasks;
  public taskTypes = this.taskFacade.taskTypes;
  public isLoading = this.taskFacade.isLoading;

  public currentFilter = signal<TaskFilter>('ALL');

  ngOnInit(): void {
    this.taskFacade.loadTaskTypes();
    this.taskFacade.loadTasks();
  }

  public getTaskTypeName(taskTypeId: string): string {
    if (!taskTypeId) return 'Sin categoría';
    const type = this.taskTypes().find(t => t.id === taskTypeId);
    return type ? type.name : 'Desconocida';
  }

  public toggleCompletion(task: Task): void {
    this.taskFacade.updateTask(task.id, { isCompleted: !task.isCompleted })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public deleteTask(id: string): void {
    this.taskFacade.deleteTask(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public openCreateModal(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      switchMap((result: CreateTask) => this.taskFacade.createTask(result)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  public openEditModal(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { task }
    });

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      switchMap((result: UpdateTask) => this.taskFacade.updateTask(task.id, result)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  public filteredTasks = computed(() => {
    const allTasks = this.tasks();
    const filter = this.currentFilter();

    if (filter === 'PENDING') return allTasks.filter(t => !t.isCompleted);
    if (filter === 'COMPLETED') return allTasks.filter(t => t.isCompleted);
    return allTasks;
  });

  public getTaskType(taskTypeId: string): TaskType {
    return this.taskTypes().find(t => t.id === taskTypeId)!;
  }

  public getContrastColor(hexColor: string): string {
    const color = hexColor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
  }
}
