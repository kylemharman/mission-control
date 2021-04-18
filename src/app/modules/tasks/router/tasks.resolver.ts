import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize, first, tap } from 'rxjs/operators';
import { TaskFacade } from '../store/facades/task.facade';
import { TasksState } from '../store/reducers';

@Injectable()
export class TasksResolver implements Resolve<any> {
  loading = false;

  constructor(
    private _taskStore: TaskFacade,
    private _store: Store<TasksState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // TODO move all this to the facade
    return this._store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this._taskStore.loadAllTasks();
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
