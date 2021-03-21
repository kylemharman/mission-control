import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ITask, TaskPriority } from 'src/app/core/models/task';
import { WithRef } from 'src/app/shared/helpers/firebase';

@Component({
  selector: 'mc-task-priority',
  templateUrl: './task-priority.component.html',
  styleUrls: ['./task-priority.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPriorityComponent {
  @Input() task: WithRef<ITask>;
  @Input() size: 'small' | 'large' = 'small';
  @Output() priority = new EventEmitter<TaskPriority>();
  taskPriority = TaskPriority;
}
