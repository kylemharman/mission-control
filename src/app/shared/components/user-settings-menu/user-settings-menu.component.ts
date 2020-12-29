import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { IUser } from 'src/app/core/models/user';
import { ThemeService } from 'src/app/core/services/theme.service';
import { UserService } from 'src/app/core/services/user.service';
import { filterUndefined } from '../../helpers/rxjs';

@Component({
  selector: 'mc-user-settings-menu',
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsMenuComponent {
  user$: Observable<IUser>;

  constructor(
    private _auth: AuthService,
    private _user: UserService,
    private _theme: ThemeService
  ) {
    this.user$ = this._user.user$.pipe(filterUndefined());
  }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  closeMenu(): void {
    this.trigger.closeMenu();
  }

  logout(): void {
    this._auth.signOut();
  }

  darkMode(value: boolean): void {
    if (value) {
      return this._theme.changeTheme('dark-theme');
    }

    return this._theme.changeTheme('light-theme');
  }
}
