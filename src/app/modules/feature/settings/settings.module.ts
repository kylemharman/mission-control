import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgMaterialModule } from 'src/app/modules/ng-material';
import { SharedModule } from '@misson-control/shared';

import { TeamComponent } from './containers/workspace/team/team.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NgMaterialModule,
    SharedModule,
  ],
})
export class SettingsModule {}
