import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { TeamComponent } from './containers/workspace/team/team.component';

@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, SettingsRoutingModule, MaterialModule, SharedModule],
})
export class SettingsModule {}
