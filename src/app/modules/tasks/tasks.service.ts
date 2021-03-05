import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ITask, Task } from 'src/app/core/models/task';
import { UserCollection } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { WithRef } from 'src/app/shared/helpers/firebase';
import { snapshot } from 'src/app/shared/helpers/rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private _afs: AngularFirestore, private _user: UserService) {}

  async createTask(name: string): Promise<void> {
    const uid = this._afs.createId();
    const order = await this._getOrderNumber();
    const task = Task.init({ name, order });
    const tasksCollection = await this._getTasksCollection();
    const doc = this._afs.collection<ITask>(tasksCollection).doc(uid);
    await doc.set({
      ...task,
      ref: doc.ref,
    });
  }

  async sortTasks(tasks: WithRef<ITask>[]) {
    const tasksCollection = await this._getTasksCollection();

    const db = firebase.firestore();
    const batch = db.batch();

    const refs = tasks.map((t) => db.collection(tasksCollection).doc(t.ref.id));
    refs.forEach((ref, i) => batch.update(ref, { order: i }));
    batch.commit();
  }

  getAllTasks$(): Observable<WithRef<ITask>[]> {
    return this._user.user$.pipe(
      switchMap((user) =>
        this._afs
          .collection<WithRef<ITask>>(
            `users/${user.uid}/${UserCollection.Tasks}`,
            (doc) => doc.orderBy('order')
          )
          .valueChanges()
      )
    );
  }

  private async _getTasksCollection(): Promise<string> {
    const user = await snapshot(this._user.user$);
    return `users/${user.uid}/tasks`;
  }

  private async _getOrderNumber(): Promise<number> {
    const allTasks = await snapshot(this.getAllTasks$());
    return allTasks.length ? allTasks.length++ : 0;
  }
}
