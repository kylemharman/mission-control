import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ITask, TaskPriority } from 'src/app/core/models/task';
import { WithRef } from 'src/app/shared/helpers/firebase';
import { snapshot } from 'src/app/shared/helpers/rxjs';
import { TasksService } from '../../../tasks.service';

@Component({
  selector: 'mc-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent {
  task$: Observable<WithRef<ITask>>;

  constructor(
    private _task: TasksService,
    private _dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data$: Observable<WithRef<ITask>>
  ) {
    this.task$ = this.data$.pipe(
      switchMap((task) => this._task.getTask$(task.ref.id))
    );
  }

  async close(): Promise<void> {
    const task = await snapshot(this.task$);
    const data = await snapshot(this.data$);

    const update = !isEqual(task, data ? task : undefined);
    this._dialogRef.close(update);
  }
}
