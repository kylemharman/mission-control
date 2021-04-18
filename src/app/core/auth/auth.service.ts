import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { auth } from 'firebase';
import { Observable, of, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  first,
  last,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { WithRef } from 'src/app/shared/helpers/firebase';
import { snapshot } from 'src/app/shared/helpers/rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { RootCollection } from '../models/root-collection';
import { IUser } from '../models/user';
import { AuthFacade } from './store/facades/auth.facade';
@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<WithRef<IUser> | undefined>;
  serverErrorMessage$ = new Subject<string>();

  constructor(
    private _db: FirestoreService,
    private _afAuth: AngularFireAuth,
    private _authStore: AuthFacade,
    private _router: Router
  ) {
    this.user$ = this._afAuth.authState.pipe(
      take(1),
      switchMap((user) => {
        return user
          ? _db.doc$<WithRef<IUser>>(`${RootCollection.Users}/${user.uid}`)
          : of(undefined);
      }),
      tap((user: WithRef<IUser> | undefined) => {
        user ? this._authStore.login(user) : this._authStore.logout();
      })
    );
  }

  async login(email, password): Promise<void> {
    try {
      const userCredentials = await this._afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      await this._router.navigate([userCredentials.user.uid, 'tasks']);
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async signUp(email: string, password: string, name: string): Promise<void> {
    try {
      const credentials = await this._afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this._createUser(this._convertFirbaseUser(credentials.user, name));
      await this.sendVerificationEmailMail();
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async sendVerificationEmailMail(): Promise<void> {
    try {
      const user = await snapshot(this._afAuth.user);
      await user.sendEmailVerification();
      await this._router.navigate(['verify-email-address']);
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

  async googleSignIn(): Promise<void> {
    try {
      const credentials = await this._afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      await this._createUser(this._convertFirbaseUser(credentials.user));
      await this._router.navigate([credentials.user.uid, 'tasks']);
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    await this._afAuth.signOut();
    this._authStore.logout();
    await this._router.navigate(['login']);
  }

  private async _createUser(user: IUser): Promise<void> {
    await this._db.set<IUser>(`${RootCollection.Users}/${user.id}`, user);
  }

  private _convertFirbaseUser(
    firebaseUser: firebase.User,
    name?: string
  ): IUser {
    return {
      id: firebaseUser.uid,
      path: '',
      displayName: name ?? firebaseUser.displayName,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      profileImage: firebaseUser.photoURL,
      colourTheme: '',
      darkMode: false,
    };
  }
}
