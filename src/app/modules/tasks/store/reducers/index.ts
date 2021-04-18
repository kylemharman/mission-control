import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { ITask } from 'src/app/core/models/task';
import { removeDocumentRefs } from 'src/app/shared/helpers/firebase';
import { environment } from 'src/environments/environment';
import { TaskActions } from '../actions';

export const tasksFeatureKey = 'tasks';
export const adapter = createEntityAdapter<ITask>();
export const initialTasksState = adapter.getInitialState();

export interface TasksState extends EntityState<ITask> {}

export const tasksReducers = createReducer(
  initialTasksState,
  on(TaskActions.allTasksLoaded, (state, action) =>
    adapter.addMany(action.tasks, state)
  )
);
