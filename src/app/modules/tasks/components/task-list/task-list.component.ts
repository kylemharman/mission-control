import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITask } from 'src/app/core/models/task';
import { snapshot } from 'src/app/shared/helpers/rxjs';
import { TaskFacade } from '../../store/facades/task.facade';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'mc-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  tasks$ = this._taskStore.tasks$;

  constructor(private _tasks: TasksService, private _taskStore: TaskFacade) {}

  async drop(event: CdkDragDrop<ITask[]>): Promise<void> {
    const tasks = await snapshot(this.tasks$);
    // TODO - fire action that updates the order of the tasks in the store. With a side effect which updates the order on the backend.
    await this._tasks.sortTasks(tasks);
    moveItemInArray(tasks, event.previousIndex, event.currentIndex);
  }
}
