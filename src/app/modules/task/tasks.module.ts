import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskRowNewComponent } from './components/task-row-new/task-row-new.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksComponent } from './pages/tasks/tasks.component';

@NgModule({
  declarations: [TaskRowNewComponent, TaskRowComponent, TasksComponent],
  imports: [CommonModule, TasksRoutingModule, SharedModule],
})
export class TasksModule {}
