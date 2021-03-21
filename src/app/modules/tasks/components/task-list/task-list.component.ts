import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/core/models/task';
import { WithRef } from 'src/app/shared/helpers/firebase';
import { snapshot } from 'src/app/shared/helpers/rxjs';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'mc-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  tasks$: Observable<WithRef<ITask>[]>;

  constructor(private _tasks: TasksService) {
    this.tasks$ = this._tasks.getAllTasks$();
  }

  async drop(event: CdkDragDrop<ITask[]>): Promise<void> {
    const tasks = await snapshot(this.tasks$);
    moveItemInArray(tasks, event.previousIndex, event.currentIndex);
    await this._tasks.sortTasks(tasks);
  }
}
