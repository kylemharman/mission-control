import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacade } from 'src/app/core/auth/store/facades/auth.facade';

@Component({
  selector: 'mc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  constructor() {}
}
