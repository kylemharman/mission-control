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

const modules = [
  CommonModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  LayoutModule,
  MatIconModule,
  MatFormFieldModule,
  MatSnackBarModule,
  FlexLayoutModule,
];
const components = [ButtonComponent, SpacesBarComponent];

@NgModule({
  declarations: [...components, AvatarComponent],
  imports: [...modules],
  exports: [...modules, ...components],
})
export class SharedModule {}
