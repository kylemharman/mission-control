import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
