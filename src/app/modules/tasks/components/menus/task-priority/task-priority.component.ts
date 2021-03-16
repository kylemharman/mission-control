import { Component, Input } from '@angular/core';
import { ITask, TaskPriority } from 'src/app/core/models/task';
import { WithRef } from 'src/app/shared/helpers/firebase';

import { TasksService } from '../../../tasks.service';

@Component({
  selector: 'mc-task-priority',
  templateUrl: './task-priority.component.html',
  styleUrls: ['./task-priority.component.scss'],
})
export class TaskPriorityComponent {
  @Input() task: WithRef<ITask>;
  taskPriority = TaskPriority;

  constructor(private _task: TasksService) {}

  async setPriority(priority: TaskPriority): Promise<void> {
    await this._task.updateTask(this.task, { priority });
  }
}
