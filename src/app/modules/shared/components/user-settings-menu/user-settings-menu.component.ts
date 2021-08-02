import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ThemeService } from 'src/app/core/services/theme.service';
import { AuthService } from 'src/app/modules/feature/auth/services/auth.service';

@Component({
  selector: 'mc-user-settings-menu',
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsMenuComponent {
  user$ = this._auth.user$;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private _auth: AuthService, private _theme: ThemeService) {}

  closeMenu(): void {
    this.trigger.closeMenu();
  }

  logout(): void {
    this._auth.logout();
  }

  darkMode(value: boolean): void {
    if (value) {
      return this._theme.changeTheme('dark-theme');
    }

    return this._theme.changeTheme('light-theme');
  }
}
