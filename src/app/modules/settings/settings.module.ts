import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ManagerSettingsComponent } from './components/manager-settings/manager-settings.component';
import { ManagerUserSettingsComponent } from './components/manager-user-settings/manager-user-settings.component';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';

@NgModule({
  declarations: [ManagerSettingsComponent, ManagerUserSettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, NgMaterialModule],
})
export class SettingsModule {}
