import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'mc-user-settings-menu',
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsMenuComponent {
  constructor(private _auth: AuthService) {}

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  closeMenu(): void {
    this.trigger.closeMenu();
  }

  logout(): void {
    this._auth.signOut();
  }

  darkMode(value): void {
    console.log(value);
  }
}
