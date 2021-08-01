import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  serverErrorMessage$ = new Subject<string>();
  user$ = this._afAuth.user;

  constructor(private _afAuth: AngularFireAuth, private _snack: MatSnackBar) {}

  async signUp(
    displayName: string,
    email: string,
    password: string
  ): Promise<void> {
    await this._afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => user.updateProfile({ displayName }))
      .catch((error) => this.serverErrorMessage$.next(error));
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this._afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.serverErrorMessage$.next(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this._afAuth.signOut();
    } catch (error) {
      this.serverErrorMessage$.next(error);
    }
  }

  async authProviderLogin(authProvider: 'google' | 'facebook'): Promise<void> {
    const provider =
      authProvider === 'google'
        ? new firebase.auth.GoogleAuthProvider()
        : new firebase.auth.FacebookAuthProvider();

    try {
      await this._afAuth.signInWithPopup(provider);
    } catch (error) {
      this.serverErrorMessage$.next(error);
    }
  }

  getAuthState$(): Observable<firebase.User> {
    return this._afAuth.authState;
  }

  async sendVerificationEmail(user: firebase.User): Promise<void> {
    await user.sendEmailVerification();
  }

  async forgotPassword(email: string): Promise<void> {
    await this._afAuth.sendPasswordResetEmail(email);
  }

  async inviteMember(email: string): Promise<void> {
    const actionCodeSettings = {
      // TODO - set enviroment variable for this
      url: 'http://localhost:4900/signup',
      handleCodeInApp: true,
    };
    if (!email) {
      return;
    }
    try {
      await this._afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
      localStorage.setItem('emailForSignIn', email);
      this._snack.open('Invite Sent 🥳');
    } catch (error) {
      this.serverErrorMessage$.next(error.message);
    }
  }
}
