import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/core/models/task';
import {
  filterUndefined,
  findProp,
  snapshot,
} from 'src/app/shared/helpers/rxjs';
import { TasksService } from '../../../tasks.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'mc-task-entry-dialog',
  template: ``,
})
export class TaskEntryDialogComponent {
  task$: Observable<ITask>;

  constructor(
    private _dialog: MatDialog,
    private _task: TasksService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.task$ = this._route.data.pipe(
      findProp<ITask>('task'),
      filterUndefined()
    );

    this.openTaskDialog();
  }

  async openTaskDialog(): Promise<void> {
    const task = await snapshot(this.task$);
    const data = await this._dialog
      .open(TaskDialogComponent, {
        height: '100%',
        width: '100%',
        maxWidth: '95vw',
        maxHeight: '90vh',
        autoFocus: false,
        data: task,
      })
      .afterClosed()
      .toPromise();

    if (!data) {
      await this._navigateBack();
      return;
    }
    await this._task.updateTask(task, data);
    await this._navigateBack();
  }

  private async _navigateBack(): Promise<void> {
    await this._router.navigate(['../'], { relativeTo: this._route });
  }
}
