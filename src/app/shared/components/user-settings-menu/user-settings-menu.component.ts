import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'mc-user-settings-menu',
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsMenuComponent {
  constructor(private _auth: AuthService, private _theme: ThemeService) {}

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
