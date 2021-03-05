import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    TaskComponent,
    TaskListComponent,
    TaskRowComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
  ],
})
export class TasksModule {}
