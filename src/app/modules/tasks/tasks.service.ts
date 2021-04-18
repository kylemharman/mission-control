import { Injectable } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ITask, Task } from 'src/app/core/models/task';
import { IUser, UserCollection } from 'src/app/core/models/user';
import { snapshot } from 'src/app/shared/helpers/rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Injectable()
export class TasksService {
  constructor(
    private _db: FirestoreService,
    // TODO - use store instead of service.
    private _authService: AuthService,
    private _snack: MatSnackBar
  ) {}

  async createTask(name: string): Promise<void> {
    if (!name.trim().length) {
      this._snack.open('⚠️ Task name can not be empty.');
      return;
    }
    const order = await this._getOrderNumber();
    const task = Task.init({ name, order });
    const tasksCollection = await snapshot(this.getTasksCollection$());
    await this._db.add(tasksCollection, task);
  }

  async sortTasks(tasks: ITask[]) {
    const tasksCollection = await snapshot(this.getTasksCollection$());
    const db = firebase.firestore();
    const batch = db.batch();

    const refs = tasks.map((t) => db.collection(tasksCollection).doc(t.path));
    refs.forEach((ref, i) => batch.update(ref, { order: i }));
    batch.commit();
  }

  getAllTasks$(): Observable<ITask[]> {
    return this.getTasksCollection$().pipe(
      switchMap((ref) =>
        this._db.col$<ITask>(ref, (doc) => doc.orderBy('order'))
      )
    );
  }

  getTask$(id: string): Observable<ITask> {
    return this.getTasksCollection$().pipe(
      switchMap((ref) => this._db.doc$<ITask>(`${ref}/${id}`))
    );
  }

  async updateTask(task: ITask, data: Partial<ITask>): Promise<void> {
    await this._db.update(task.path, data);
  }

  getTasksCollection$(): Observable<string> {
    return this._authService.user$.pipe(
      map((user: IUser) => `${user.path}/${UserCollection.Tasks}`)
    );
  }

  private async _getOrderNumber(): Promise<number> {
    // TODO get this value from a counters doc in the db - will need a cloud function that listens and increments/decrement on add/delete of a task
    const allTasks = await snapshot(this.getAllTasks$());
    return allTasks.length ? allTasks.length++ : 0;
  }
}
