import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import {
  removeDocumentRef,
  removeDocumentRefs,
} from 'src/app/shared/helpers/firebase';
import { TasksService } from '../../tasks.service';
import { TaskActions } from '../actions';

@Injectable()
export class TasksEffects {
  loadCourses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.loadAllTasks),
      concatMap(() => this._taskService.getAllTasks$()),
      map((tasks) => {
        const t = removeDocumentRefs(tasks);
        return TaskActions.allTasksLoaded({ tasks: t });
      })
    )
  );

  constructor(private _actions$: Actions, private _taskService: TasksService) {}
}
