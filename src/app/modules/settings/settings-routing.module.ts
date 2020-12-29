import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerUserSettingsComponent } from './components/manager-user-settings/manager-user-settings.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ManagerUserSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
