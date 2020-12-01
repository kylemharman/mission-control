import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonComponent } from './components/button/button.component';
import { SpacesBarComponent } from './components/spaces-bar/spaces-bar.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { UserSettingsMenuComponent } from './components/user-settings-menu/user-settings-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { ToggleComponent } from './components/toggle/toggle.component';

const modules = [
  CommonModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatMenuModule,
  LayoutModule,
  MatSlideToggleModule,
  FlexLayoutModule,
  RouterModule,
];
const components = [
  ButtonComponent,
  SpacesBarComponent,
  UserSettingsMenuComponent,
  AvatarComponent,
  ToggleComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components],
})
export class SharedModule {}
