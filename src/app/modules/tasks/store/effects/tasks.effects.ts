import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { TasksService } from '../../tasks.service';
import { TaskActions } from '../actions';

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.loadAllTasks),
      concatMap(() => this._taskService.getAllTasks$()),
      map((tasks) => TaskActions.allTasksLoaded({ tasks }))
    )
  );

  updateTask$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(TaskActions.taskUpdated),
        concatMap((action) =>
          this._taskService.updateTask(
            action.update.id as string,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );

  createTask$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(TaskActions.taskCreated),
        concatMap((action) => this._taskService.saveTask(action.task))
      ),
    { dispatch: false }
  );

  constructor(private _actions$: Actions, private _taskService: TasksService) {}
}
