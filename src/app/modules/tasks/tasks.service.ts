import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ITask, Task } from 'src/app/core/models/task';
import { IUser, UserCollection } from 'src/app/core/models/user';
import { snapshot } from 'src/app/shared/helpers/rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { TaskFacade } from './store/facades/task.facade';

@Injectable()
export class TasksService {
  constructor(
    private _db: FirestoreService,
    private _taskStore: TaskFacade,
    // TODO - use store instead of service.
    private _authService: AuthService,
    private _snack: MatSnackBar
  ) {}

  async createTask(name: string): Promise<void> {
    if (!name.trim().length) {
      this._snack.open('⚠️ Task name can not be empty.');
      return;
    }
    const id = this._db.generateId();
    const order = await this._getOrderNumber();
    const taskCollectionRef = await snapshot(this.getTasksCollection$());
    const docRef = this._db.col<ITask>(taskCollectionRef).doc<ITask>(id);
    const task = Task.init({
      name,
      order,
      id: docRef.ref.id,
      path: docRef.ref.path,
    });
    this._taskStore.createTask(task);
  }

  async saveTask(task: ITask): Promise<void> {
    await this._db.set(task.path, task);
  }

  async sortTasks(tasks: ITask[]) {
    const tasksCollection = await snapshot(this.getTasksCollection$());
    const db = firebase.firestore();
    const batch = db.batch();

    const refs = tasks.map((t) => db.collection(tasksCollection).doc(t.id));
    refs.forEach((ref, i) => batch.update(ref, { order: i }));
    batch.commit();
  }

  async updateTask(taskID: string, data: Partial<ITask>): Promise<void> {
    const taskRef = await snapshot(this.getTasksCollection$());
    await this._db.update(`${taskRef}/${taskID}`, data);
  }

  getAllTasks$(): Observable<ITask[]> {
    return this.getTasksCollection$().pipe(
      switchMap((ref) =>
        this._db.col$<ITask>(ref, (doc) => doc.orderBy('order'))
      )
    );
  }

  getTasksCollection$(): Observable<string> {
    return this._authService.user$.pipe(
      map((user: IUser) => `${user.path}/${UserCollection.Tasks}`)
    );
  }

  private async _getOrderNumber(): Promise<number> {
    let tasksTotal = await snapshot(this._taskStore.totalTasks$);
    return tasksTotal ? tasksTotal++ : 0;
  }
}
