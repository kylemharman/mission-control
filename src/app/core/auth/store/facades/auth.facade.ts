import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/core/models/user';
import { State } from 'src/app/reducers';
import {
  isWithRef,
  removeDocumentRef,
  WithRef,
} from 'src/app/shared/helpers/firebase';
import { AuthActions, LoginPageActions } from '../actions';
import { AuthState } from '../reducers';
import { isLoggedIn, user } from '../selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  user$ = this._store.select(user);
  isLoggedIn$ = this._store.select(isLoggedIn);

  constructor(private _store: Store<AuthState>) {}

  login(user: WithRef<IUser>): void {
    this._store.dispatch(
      LoginPageActions.login({
        user: removeDocumentRef(user),
      })
    );
  }

  logout(): void {
    this._store.dispatch(AuthActions.logout());
  }
}
