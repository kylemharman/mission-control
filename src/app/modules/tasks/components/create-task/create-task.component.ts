import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskFacade } from '../../store/facades/task.facade';

@Component({
  selector: 'mc-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent {
  name = new FormControl('');

  constructor(private _taskStore: TaskFacade) {}

  createTask(): void {
    this._taskStore.createTask(this.name.value);
    this.name.reset();
  }
}
