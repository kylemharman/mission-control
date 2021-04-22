import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IUser } from 'src/app/core/models/user';
import { AuthActions, LoginPageActions } from '../actions';
import { AuthState } from '../reducers';
import { isLoggedIn, user } from '../selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  user$ = this._store.pipe(select(user));
  isLoggedIn$ = this._store.pipe(select(isLoggedIn));

  constructor(private _store: Store<AuthState>) {}

  login(user: IUser): void {
    this._store.dispatch(LoginPageActions.login({ user }));
  }

  logout(): void {
    this._store.dispatch(AuthActions.logout());
  }
}
