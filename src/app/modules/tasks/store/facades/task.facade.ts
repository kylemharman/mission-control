import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskActions } from '../actions';
import { TasksState } from '../reducers';

@Injectable()
export class TaskFacade {
  constructor(private _store: Store<TasksState>) {}

  loadAllTasks(): void {
    this._store.dispatch(TaskActions.loadAllTasks());
  }

  // loadTask(): void {
  //   this._store.dispatch();
  // }
}
