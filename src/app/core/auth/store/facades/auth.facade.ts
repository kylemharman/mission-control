import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as firebase from 'firebase';
import { AuthActions } from '../actions';
import { AuthState } from '../reducers';
import {
  getError,
  getIsLoading,
  getIsLoggedIn,
  getUser,
} from '../selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  user$ = this._store.pipe(select(getUser));
  isLoggedIn$ = this._store.pipe(select(getIsLoggedIn));
  isLoading$ = this._store.pipe(select(getIsLoading));
  error$ = this._store.pipe(select(getError));

  constructor(private _store: Store<AuthState>) {}

  getUser(): void {
    this._store.dispatch(AuthActions.GetUser());
  }

  login(email: string, password: string): void {
    this._store.dispatch(AuthActions.LoginRequested({ email, password }));
  }

  authProviderLogin(authProvider: 'google' | 'facebook'): void {
    this._store.dispatch(AuthActions.AuthProviderLogin({ authProvider }));
  }

  signUp(username: string, email: string, password: string): void {
    this._store.dispatch(
      AuthActions.SignUpRequested({ username, email, password })
    );
  }

  sendVerificationEmailMail(user: firebase.User) {
    this._store.dispatch(AuthActions.SendVerificationEmail({ user }));
  }

  forgotPassword(email: string) {
    this._store.dispatch(AuthActions.ForgotPasswordRequested({ email }));
  }

  logout(): void {
    this._store.dispatch(AuthActions.LogoutRequested());
  }
}
