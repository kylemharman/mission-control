import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacade } from 'src/app/core/auth/store/facades/auth.facade';

@Component({
  selector: 'mc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  constructor(private _authStore: AuthFacade) {}
  // TODO - move the responsibility away from tasks for this - this should probably be moved away from local and depend on AfAuth
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) this._authStore.login(user);
  }
}
