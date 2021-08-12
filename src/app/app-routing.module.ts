import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { IsWorkspaceMemberGuard } from './core/guards/is-workspace-member.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'setup',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/feature/workspaces/workspaces.module').then(
        (m) => m.WorkspacesModule
      ),
  },
  {
    path: ':uid',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/feature/shell/shell.module').then((m) => m.ShellModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
