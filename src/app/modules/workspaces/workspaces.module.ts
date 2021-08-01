import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from '../../ng-material/ng-material.module';

import { SharedModule } from '../../shared/shared.module';
import { CreateWorkspaceFormComponent } from './components/create-workspace-form/create-workspace-form.component';
import { InviteMemberComponent } from './components/invite-member/invite-member.component';
import { ManageInvitesComponent } from './components/manage-invites/manage-invites.component';
import { CreateWorkspacePageComponent } from './containers/create-workspace-page/create-workspace-page.component';
import { WorkspacesRoutingModule } from './workspaces-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WorkspacesRoutingModule,
    NgMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CreateWorkspaceFormComponent,
    InviteMemberComponent,
    CreateWorkspacePageComponent,
    ManageInvitesComponent,
  ],
  exports: [ManageInvitesComponent],
})
export class WorkspacesModule {}
