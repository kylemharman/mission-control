import { Component, Inject } from '@angular/core';
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
    @Inject(MAT_DIALOG_DATA) private _data: ITask
  ) {
    this.task = { ..._data };
  }

  close(): void {
    const task = !isEqual(this.task, this._data) ? this.task : undefined;
    this._dialogRef.close(task);
  }
}
