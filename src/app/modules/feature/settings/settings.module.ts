import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from '@misson-control/ng-material';
import { SharedModule } from '@misson-control/shared';
import { InviteMemberComponent } from './components/invite-member/invite-member.component';
import { UserSettingsMenuComponent } from './components/user-settings-menu/user-settings-menu.component';

import { TeamComponent } from './containers/workspace/team/team.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NgMaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TeamComponent,
    InviteMemberComponent,
    UserSettingsMenuComponent,
  ],
})
export class SettingsModule {}
