import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { TasksService } from '../../tasks.service';
import { TaskActions } from '../actions';

@Injectable()
export class TasksEffects {
  loadCourses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.loadAllTasks),
      concatMap(() => this._taskService.getAllTasks$()),
      map((tasks) => TaskActions.allTasksLoaded({ tasks }))
    )
  );

  constructor(private _actions$: Actions, private _taskService: TasksService) {}
}
