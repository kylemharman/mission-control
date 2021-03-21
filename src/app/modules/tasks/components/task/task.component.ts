import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mc-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {}
