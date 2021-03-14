import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskDialogComponent } from './components/dialogs/task-dialog/task-dialog.component';
import { TaskEntryDialogComponent } from './components/dialogs/task-entry-dialog/task-entry-dialog.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskResolver } from './router/task.resolver';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: ':id',
        component: TaskEntryDialogComponent,
        resolve: {
          task: TaskResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
