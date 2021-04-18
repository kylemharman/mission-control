import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as moment from 'moment';
import { ITask, TaskPriority } from 'src/app/core/models/task';
import { toTimestamp } from 'src/app/shared/helpers/time';

import { TasksService } from '../../tasks.service';

@Component({
  selector: 'mc-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskRowComponent {
  @Input() task: ITask;

  constructor(private _task: TasksService) {}

  async setPriority(priority: TaskPriority): Promise<void> {
    if (this.task.priority !== priority) {
      await this._task.updateTask(this.task, { priority });
    }
  }

  async setDueDate(dueDate: moment.Moment): Promise<void> {
    await this._task.updateTask(this.task, { dueDate: toTimestamp(dueDate) });
  }
}
