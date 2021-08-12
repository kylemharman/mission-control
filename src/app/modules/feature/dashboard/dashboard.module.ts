import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, MaterialModule, SharedModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
