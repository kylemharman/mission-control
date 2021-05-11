import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Update } from '@ngrx/entity';
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

  constructor(private _taskStore: TaskFacade) {}

  async drop(event: CdkDragDrop<ITask[]>): Promise<void> {
    const tasks = await snapshot(this.tasks$);
    console.log({ tasks });
    moveItemInArray(tasks, event.previousIndex, event.currentIndex);

    const updates: Update<ITask>[] = tasks.map((task, index) => ({
      id: task.id,
      changes: { order: index },
    }));
    this._taskStore.sortTasks(updates);
  }
}
