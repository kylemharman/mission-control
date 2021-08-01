import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, NgMaterialModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
