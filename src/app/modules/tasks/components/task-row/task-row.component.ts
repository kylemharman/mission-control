import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITask, TaskPriority } from 'src/app/core/models/task';
import { WithRef } from 'src/app/shared/helpers/firebase';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'mc-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskRowComponent {
  @Input() task: WithRef<ITask>;

  constructor(private _task: TasksService) {}

  async setPriority(priority: TaskPriority): Promise<void> {
    await this._task.updateTask(this.task, { priority });
  }
}
