import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITask } from 'src/app/core/models/task';
import { TasksService } from '../../tasks.service';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';

@Component({
  selector: 'mc-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
})
export class TaskRowComponent {
  @Input() task: ITask;

  constructor(private _dialog: MatDialog, private _task: TasksService) {}

  async openTaskDialog(): Promise<void> {
    const task = await this._dialog
      .open(TaskDialogComponent, {
        height: '100%',
        width: '100%',
        maxWidth: '95vw',
        maxHeight: '90vh',
        autoFocus: false,
        data: this.task,
      })
      .afterClosed()
      .toPromise();

    if (!task) {
      return;
    }
    await this._task.updateTask(task);
  }
}
