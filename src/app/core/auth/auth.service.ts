import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { Subject } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { RootCollection } from '../models/root-collection';
import { IUser } from '../models/user';

// import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({ providedIn: 'root' })
export class AuthService {
  serverErrorMessage$ = new Subject<string>();

  constructor(
    private _db: FirestoreService,
    private _afAuth: AngularFireAuth,
    private _router: Router // private snackBar: MatSnackBar
  ) {}

  async signIn(email, password): Promise<void> {
    try {
      await this._afAuth.signInWithEmailAndPassword(email, password);
      this._router.navigate([(await this._afAuth.currentUser).uid, 'tasks']);
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
      this._router.navigate([(await this._afAuth.currentUser).uid, 'tasks']);
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
    await this._db.set<Partial<IUser>>(`${RootCollection.Users}/${user.uid}`, {
      displayName: name,
    });
  }
}
