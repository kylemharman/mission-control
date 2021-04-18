import { createAction, props } from '@ngrx/store';
import { ITask } from 'src/app/core/models/task';
import { WithRef } from 'src/app/shared/helpers/firebase';

export const loadAllTasks = createAction('[Tasks Resolver] Load All Tasks');

export const allTasksLoaded = createAction(
  '[Load Tasks Effect] All Tasks Loaded',
  props<{ tasks: ITask[] }>()
);
