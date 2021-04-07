import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CloseButtonComponent } from './components/buttons/close-button/close-button.component';
import { MainButtonComponent } from './components/buttons/main-button/main-button.component';
import { SpacesBarComponent } from './components/spaces-bar/spaces-bar.component';
import { TimeSelectorComponent } from './components/time-selector/time-selector.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { UserSettingsMenuComponent } from './components/user-settings-menu/user-settings-menu.component';
import { TOOLTIP_CONFIG } from './config/ng2-tooltip-config';
import { MomentModule } from 'ngx-moment';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';

const modules = [
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDatepickerModule,
  MatMomentDateModule,
  LayoutModule,
  FlexLayoutModule,
  TooltipModule,
  MatButtonToggleModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MomentModule,
];
const components = [
  MainButtonComponent,
  SpacesBarComponent,
  UserSettingsMenuComponent,
  AvatarComponent,
  ToggleComponent,
  CloseButtonComponent,
  TimeSelectorComponent,
  DateSelectorComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...modules,
    TooltipModule.forRoot(TOOLTIP_CONFIG as TooltipOptions),
  ],
  exports: [...modules, ...components],
})
export class SharedModule {}
