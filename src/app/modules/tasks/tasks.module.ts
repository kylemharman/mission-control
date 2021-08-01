import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskDialogComponent } from './components/dialogs/task-dialog/task-dialog.component';
import { TaskEntryDialogComponent } from './components/dialogs/task-entry-dialog/task-entry-dialog.component';
import { DueDateSelectorComponent } from './components/menus/due-date-selector/due-date-selector.component';
import { PrioritySelectorComponent } from './components/menus/priority-selector/priority-selector.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { TasksComponent } from './containers/tasks/tasks.component';
import { TaskResolver } from './router/task.resolver';
import { TasksResolver } from './router/tasks.resolver';
import { TasksEffects } from './store/effects/tasks.effects';
import { TaskFacade } from './store/facades/task.facade';
import * as fromTasks from './store/reducers';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksService } from './services/tasks.service';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';

@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    TaskListComponent,
    TaskRowComponent,
    TaskDialogComponent,
    TaskEntryDialogComponent,
    PrioritySelectorComponent,
    DueDateSelectorComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    NgMaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    StoreModule.forFeature(fromTasks.tasksFeatureKey, fromTasks.tasksReducers),
    EffectsModule.forFeature([TasksEffects]),
  ],
  providers: [TasksService, TaskFacade, TaskResolver, TasksResolver],
  entryComponents: [TaskDialogComponent, TaskEntryDialogComponent],
})
export class TasksModule {}
