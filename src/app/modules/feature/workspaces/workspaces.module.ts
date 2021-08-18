import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

import { SharedModule } from '../../shared/shared.module';
import { CreateWorkspaceFormComponent } from './components/create-workspace-form/create-workspace-form.component';
import { WorkspacesRoutingModule } from './workspaces-routing.module';
import { SetupComponent } from './containers/setup/setup.component';

@NgModule({
  imports: [
    CommonModule,
    WorkspacesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateWorkspaceFormComponent, SetupComponent],
  exports: [],
})
export class WorkspacesModule {}
