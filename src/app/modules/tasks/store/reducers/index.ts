import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ITask } from 'src/app/core/models/task';
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
