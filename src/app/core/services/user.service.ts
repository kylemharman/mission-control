import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RootCollection } from '../models/root-collection';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<IUser | undefined>;

  constructor(
    private _afs: AngularFirestore,
    private _afAuth: AngularFireAuth
  ) {
    this.user$ = this._afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this._afs
            .doc<IUser>(`${RootCollection.Users}/${user.uid}`)
            .valueChanges();
        } else {
          return of(undefined);
        }
      })
    );
  }
}
