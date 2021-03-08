import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ITask, Task } from 'src/app/core/models/task';
import { IUser, UserCollection } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { WithRef } from 'src/app/shared/helpers/firebase';
import { snapshot } from 'src/app/shared/helpers/rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private _db: FirestoreService,
    private _afs: AngularFirestore,
    private _user: UserService
  ) {}

  async createTask(name: string): Promise<void> {
    const order = await this._getOrderNumber();
    const task = Task.init({ name, order });
    const tasksCollection = await snapshot(this._getTasksCollection$());
    await this._db.add(tasksCollection, task);
  }

  async sortTasks(tasks: WithRef<ITask>[]) {
    const tasksCollection = await snapshot(this._getTasksCollection$());
    const db = firebase.firestore();
    const batch = db.batch();

    const refs = tasks.map((t) => db.collection(tasksCollection).doc(t.ref.id));
    refs.forEach((ref, i) => batch.update(ref, { order: i }));
    batch.commit();
  }

  getAllTasks$(): Observable<WithRef<ITask>[]> {
    return this._getTasksCollection$().pipe(
      switchMap((ref) =>
        this._db.col$<WithRef<ITask>>(ref, (doc) => doc.orderBy('order'))
      )
    );
  }

  async updateTask(task: WithRef<Partial<ITask>>): Promise<void> {
    await this._db.update<Partial<ITask>>(task.ref.path, task);
  }

  private _getTasksCollection$(): Observable<string> {
    return this._user.user$.pipe(
      map((user: IUser) => `users/${user.uid}/${UserCollection.Tasks}`) // TODO make a root collection for 'users'
    );
  }

  private async _getOrderNumber(): Promise<number> {
    const allTasks = await snapshot(this.getAllTasks$());
    return allTasks.length ? allTasks.length++ : 0;
  }
}
