import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'mc-user-settings-menu',
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsMenuComponent {
  constructor(private _auth: AuthService) {}

  logout(): void {
    this._auth.signOut();
  }

  toggle(value) {
    console.log(value);
  }
}
