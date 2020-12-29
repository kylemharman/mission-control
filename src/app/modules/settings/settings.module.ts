import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ManagerSettingsComponent } from './components/manager-settings/manager-settings.component';
import { ManagerUserSettingsComponent } from './components/manager-user-settings/manager-user-settings.component';


@NgModule({
  declarations: [ManagerSettingsComponent, ManagerUserSettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
