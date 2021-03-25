import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from './components/dialogs/task-dialog/task-dialog.component';
import { TaskEntryDialogComponent } from './components/dialogs/task-entry-dialog/task-entry-dialog.component';
import { TaskPriorityComponent } from './components/menus/task-priority/task-priority.component';
import { TasksService } from './tasks.service';
import { TaskResolver } from './router/task.resolver';
import { TaskDueDateComponent } from './components/menus/task-due-date/task-due-date.component';

@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    TaskListComponent,
    TaskRowComponent,
    TaskDialogComponent,
    TaskEntryDialogComponent,
    TaskPriorityComponent,
    TaskDueDateComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [TasksService, TaskResolver],
  entryComponents: [TaskDialogComponent, TaskEntryDialogComponent],
})
export class TasksModule {}
