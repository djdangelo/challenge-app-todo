import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskFacade } from '@application/facades/task.facade';
import { CreateTask, Task } from '@core/models/models';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<TaskDialogComponent>);
  public readonly taskFacade = inject(TaskFacade);

  public readonly data: Task = inject(MAT_DIALOG_DATA, { optional: true });

  public taskTypes = this.taskFacade.taskTypes;
  public isLoading = this.taskFacade.isLoading;

  public taskForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    taskTypeId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  ngOnInit(): void {
    if (this.data) {
      this.taskForm.patchValue({
        title: this.data.title,
        description: this.data.description,
        taskTypeId: this.data.taskTypeId
      });
    }
  }

  public onSubmit(): void {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.getRawValue();

    const newTask: CreateTask = {
      title: formValue.title,
      description: formValue.description,
      taskTypeId: formValue.taskTypeId
    };

    this.dialogRef.close(newTask);
  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }
}
