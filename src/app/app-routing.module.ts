import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { IsWorkspaceMemberGuard } from './core/guards/is-workspace-member.guard';
import { ManageInvitesComponent } from './modules/workspaces/components/manage-invites/manage-invites.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'invites',
    canActivate: [AuthGuard],
    component: ManageInvitesComponent,
  },
  {
    path: 'create-workspace',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/workspaces/workspaces.module').then(
        (m) => m.WorkspacesModule
      ),
  },
  {
    path: ':id',
    canActivate: [IsWorkspaceMemberGuard],
    component: AppComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
