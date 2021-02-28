import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from 'src/app/core/models/task';
import { UserService } from 'src/app/core/services/user.service';
import { snapshot } from 'src/app/shared/helpers/rxjs';

@Component({
  selector: 'mc-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  constructor(private _afs: AngularFirestore, private _user: UserService) {}

  async createTask(name): Promise<void> {
    const user = await snapshot(this._user.user$);
    const path = `users/${user.uid}/tasks`;
    const task = Task.init({ name });

    const id = this._afs.createId();
    const doc = this._afs.collection(path).doc(id);
    await doc.set({
      ...task,
      ref: doc.ref,
    });
  }
}
