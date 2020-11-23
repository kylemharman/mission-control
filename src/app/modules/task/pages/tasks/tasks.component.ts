import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'mc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  constructor(private _auth: AuthService) {}

  logout(): void {
    this._auth.signOut();
  }
}
