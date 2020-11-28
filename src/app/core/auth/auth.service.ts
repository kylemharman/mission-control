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
  serverErrorMessage$ = new Subject<string>();

  constructor(
    private _afs: AngularFirestore,
    private _afAuth: AngularFireAuth,
    private _router: Router // private snackBar: MatSnackBar
  ) {}

  async signIn(email, password): Promise<void> {
    try {
      await this._afAuth.signInWithEmailAndPassword(email, password);
      this._router.navigate(['tasks']);
    } catch (error) {
      console.log(error);
      this.serverErrorMessage$.next(error.message);
    }
  }

  async signUp(email: string, password: string, name: string): Promise<void> {
    try {
      const credential = await this._afAuth.createUserWithEmailAndPassword(
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

  async googleSignIn(): Promise<void> {
    try {
      const provider = new auth.GoogleAuthProvider();
      await this._afAuth.signInWithPopup(provider);
      console.log('user registered');
      this._router.navigate(['tasks']);
    } catch (error) {
      console.log(error);
    }
  }

  async signOut(): Promise<void> {
    await this._afAuth.signOut();
    this._router.navigate(['login']);
  }

  private _updateUserName(user: firebase.User, name: string): Promise<void> {
    const userRef: AngularFirestoreDocument<Partial<IUser>> = this._afs.doc(
      `users/${user.uid}`
    );

    return userRef.set({ displayName: name }, { merge: true });
  }
}
