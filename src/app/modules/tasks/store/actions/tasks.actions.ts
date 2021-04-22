import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ITask } from 'src/app/core/models/task';

export const loadAllTasks = createAction('[Tasks Resolver] Load All Tasks');

export const allTasksLoaded = createAction(
  '[Load Tasks Effect] All Tasks Loaded',
  props<{ tasks: ITask[] }>()
);

export const taskUpdated = createAction(
  '[Task Enrty Dialog] Task Updated',
  props<{ update: Update<ITask> }>()
);

export const taskCreated = createAction(
  '[Create Task] Task Created',
  props<{ task: ITask }>()
);

export const setSelectedTaskId = createAction(
  '[Task Resolver] Set Selected Task Id',
  props<{ id: string }>()
);

export const clearSelectTaskId = createAction(
  '[Task Dialog] Clear Selected Task ID'
);
