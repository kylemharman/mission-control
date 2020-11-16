import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<IUser>;
  serverErrorMessage$ = new Subject<string>();

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router // private snackBar: MatSnackBar
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signIn(email, password): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['tasks']);
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async signUp(email: string, password: string, name: string): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmailMail();
      await this._updateUserName(credential.user, name);
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async sendVerificationEmailMail(): Promise<void> {
    try {
      const currentUser = await this.afAuth.currentUser;
      await currentUser.sendEmailVerification();
      this.router.navigate(['verify-email-address']);
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async forgotPassword(passwordResetEmail): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
      // this.snackBar.open('Password reset email sent, check your inbox.');
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async googleSignIn(): Promise<void> {
    try {
      const provider = new auth.GoogleAuthProvider();
      await this.afAuth.signInWithPopup(provider);
      console.log('user registered');
      this.router.navigate(['tasks']);
    } catch (error) {
      console.log(error);
    }
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['sign-in']);
  }

  private _updateUserName(user: firebase.User, name: string): Promise<void> {
    const userRef: AngularFirestoreDocument<Partial<IUser>> = this.afs.doc(
      `users/${user.uid}`
    );

    return userRef.set({ displayName: name }, { merge: true });
  }
}
