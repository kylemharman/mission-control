import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@misson-control/shared';

import { NgMaterialModule } from '../../ng-material/ng-material.module';
import { CreateWorkspaceFormComponent } from './components/create-workspace-form/create-workspace-form.component';
import { SetupComponent } from './containers/setup/setup.component';
import { WorkspacesRoutingModule } from './workspaces-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WorkspacesRoutingModule,
    NgMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateWorkspaceFormComponent, SetupComponent],
  exports: [],
})
export class WorkspacesModule {}
