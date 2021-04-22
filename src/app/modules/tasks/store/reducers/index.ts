import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ITask, Task } from 'src/app/core/models/task';
import { TaskActions } from '../actions';

export const tasksFeatureKey = 'tasks';
export interface TasksState extends EntityState<ITask> {
  selectedTaskId?: string;
  loaded: boolean;
}

export const tasksAdapter = createEntityAdapter<ITask>({
  sortComparer: Task.compareTasks,
});

export const {
  selectIds: getTaskIds,
  selectEntities: getTaskEntities,
  selectAll: getAllTasks,
  selectTotal: getTotalTasks,
} = tasksAdapter.getSelectors();

export const initialTasksState = tasksAdapter.getInitialState({
  loaded: false,
});

export const tasksReducers = createReducer(
  initialTasksState,
  on(TaskActions.allTasksLoaded, (state, action) =>
    tasksAdapter.addMany(action.tasks, { ...state, loaded: true })
  ),
  on(TaskActions.taskUpdated, (state, action) =>
    tasksAdapter.updateOne(action.update, state)
  ),
  on(TaskActions.setSelectedTaskId, (state, action) => ({
    ...state,
    selectedTaskId: action.id,
  })),
  on(TaskActions.clearSelectTaskId, (state, _action) => ({
    ...state,
    selectedTaskId: undefined,
  })),
  on(TaskActions.taskCreated, (state, action) =>
    tasksAdapter.addOne(action.task, state)
  )
);
