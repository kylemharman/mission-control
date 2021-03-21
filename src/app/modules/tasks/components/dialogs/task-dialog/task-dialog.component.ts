import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { ITask, TaskPriority } from 'src/app/core/models/task';
import { WithRef } from 'src/app/shared/helpers/firebase';

@Component({
  selector: 'mc-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialogComponent {
  task: ITask;

  constructor(
    private _dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WithRef<ITask>
  ) {
    this.task = { ...this.data };
  }

  setPriority(priority: TaskPriority) {
    console.log(priority);
    this.task.priority = priority;
  }

  close() {
    const update = !isEqual(this.task, this.data) ? this.task : undefined;
    this._dialogRef.close(update);
  }
}
