import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions, LoginPageActions } from '../actions';

@Injectable()
export class AuthEffects {
  // login$ = createEffect(
  //   () =>
  //     this._actions$.pipe(
  //       ofType(LoginPageActions.login),
  //       tap((action) =>
  //         localStorage.setItem('user', JSON.stringify(action.user))
  //       )
  //     ),
  //   // prevents dispatching to the store.
  //   { dispatch: false }
  // );

  // logout$ = createEffect(
  //   () =>
  //     this._actions$.pipe(
  //       ofType(AuthActions.logout),
  //       tap(() => localStorage.removeItem('user'))
  //     ),
  //   { dispatch: false }
  // );

  constructor(private _actions$: Actions) {}
}
