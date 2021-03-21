import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  constructor() {}
}
