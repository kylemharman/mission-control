import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgMaterialModule } from '../../ng-material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgMaterialModule,
    SharedModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
