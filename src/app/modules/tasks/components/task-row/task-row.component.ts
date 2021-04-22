import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as moment from 'moment';
import { ITask, TaskPriority } from 'src/app/core/models/task';
import { toTimestamp } from 'src/app/shared/helpers/time';
import { TaskFacade } from '../../store/facades/task.facade';

@Component({
  selector: 'mc-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskRowComponent {
  @Input() task: ITask;

  constructor(private _taskStore: TaskFacade) {}

  setPriority(priority: TaskPriority): void {
    if (this.task.priority !== priority) {
      this._taskStore.updateTask({
        id: this.task.id,
        changes: { priority },
      });
    }
  }

  setDueDate(dueDate: moment.Moment): void {
    this._taskStore.updateTask({
      id: this.task.id,
      changes: { dueDate: toTimestamp(dueDate) },
    });
  }
}
