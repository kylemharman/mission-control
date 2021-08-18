import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '@misson-control/auth';
import { ThemeService } from '@misson-control/core';
import { WorkspaceService } from '@misson-control/workspaces';

@Component({
  selector: 'mc-user-settings-menu',
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsMenuComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(
    public ws: WorkspaceService,
    private _auth: AuthService,
    private _theme: ThemeService
  ) {}

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
