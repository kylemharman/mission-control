import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { auth } from 'firebase';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WithRef } from 'src/app/shared/helpers/firebase';
import { snapshot } from 'src/app/shared/helpers/rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { RootCollection } from '../models/root-collection';
import { IUser } from '../models/user';
@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<WithRef<IUser> | undefined>;
  serverErrorMessage$ = new Subject<string>();

  constructor(
    private _db: FirestoreService,
    private _afAuth: AngularFireAuth,
    private _router: Router
  ) {
    this.user$ = this._afAuth.authState.pipe(
      switchMap((user) =>
        user
          ? _db.doc$<IUser>(`${RootCollection.Users}/${user.uid}`)
          : of(undefined)
      )
    );
  }

  async signIn(email, password): Promise<void> {
    try {
      const userCredentials = await this._afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this._router.navigate([userCredentials.user.uid, 'tasks']);
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async signUp(email: string, password: string, name: string): Promise<void> {
    try {
      const userCredentials = await this._afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmailMail();
      await this._updateUserName(userCredentials.user, name);
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async sendVerificationEmailMail(): Promise<void> {
    try {
      const currentUser = await this._afAuth.currentUser;
      await currentUser.sendEmailVerification();
      this._router.navigate(['verify-email-address']);
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async forgotPassword(passwordResetEmail): Promise<void> {
    try {
      await this._afAuth.sendPasswordResetEmail(passwordResetEmail);
      // this.snackBar.open('Password reset email sent, check your inbox.');
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async googleSignIn(): Promise<IUser> {
    try {
      await this._afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      const user = await snapshot(this.user$);
      this._router.navigate([user.uid, 'tasks']);
      return this._removeDocumentRef(user);
    } catch (error) {
      console.log(error);
    }
  }

  async signOut(): Promise<void> {
    await this._afAuth.signOut();
    this._router.navigate(['login']);
  }

  // TODO only updates on email sign up - edit firebase function to add timestamps and ref to user
  private async _updateUserName(
    user: firebase.User,
    name: string
  ): Promise<void> {
    console.log('_updateUserName', { user, name });
    await this._db.set<Pick<IUser, 'displayName'>>(
      `${RootCollection.Users}/${user.uid}`,
      {
        displayName: name,
      }
    );
  }

  private _removeDocumentRef(user: WithRef<IUser>): IUser {
    delete user.ref;
    return user;
  }
}
