import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './containers/workspace/team/team.component';

const routes: Routes = [
  {
    path: 'user',
    children: [],
  },
  {
    path: 'workspace',
    // protect with an admin guard.
    canActivate: [],
    children: [
      {
        path: 'team',
        component: TeamComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
