import { Component, Input } from '@angular/core';
import { ITask } from 'src/app/core/models/task';

@Component({
  selector: 'mc-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
})
export class TaskRowComponent {
  @Input() task: ITask;
}
