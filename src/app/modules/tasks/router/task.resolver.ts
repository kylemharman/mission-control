import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ITask } from 'src/app/core/models/task';
import { snapshot } from 'src/app/shared/helpers/rxjs';

import { TasksService } from '../tasks.service';

@Injectable()
export class TaskResolver implements Resolve<ITask> {
  constructor(private _task: TasksService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<ITask> {
    return await snapshot(this._task.getTask$(route.paramMap.get('id')));
  }
}
