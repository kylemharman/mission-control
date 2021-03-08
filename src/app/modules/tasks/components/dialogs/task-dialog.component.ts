import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { ITask } from 'src/app/core/models/task';

@Component({
  selector: 'mc-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent {
  task: ITask;

  constructor(
    private _dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ITask
  ) {
    this.task = { ...data };
  }

  close(): void {
    const task = !isEqual(this.task, this.data) ? this.task : undefined;
    this._dialogRef.close(task);
  }
}
