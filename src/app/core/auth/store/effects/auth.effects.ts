import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { AuthService } from '../../auth.service';
import { AuthActions } from '../actions';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.SignUpRequested),
      concatMap((payload) =>
        this._authService
          .signUp$(payload.email, payload.password)
          .pipe(map((user) => ({ user, payload })))
      ),
      switchMap((credentials) => {
        const user = this._authService.createUser(
          credentials.user.user,
          credentials.payload.username
        );
        return [
          AuthActions.SignUpCompleted(),
          AuthActions.LoginSuccess({ user }),
          AuthActions.SaveUser({ user }),
          AuthActions.SendVerificationEmail({ user: credentials.user.user }),
        ];
      }),
      catchError((error) => of(AuthActions.SignUpFailed({ error })))
    )
  );

  saveUser$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.SaveUser),
        concatMap((payload) => this._authService.saveUser(payload.user)),
        catchError((error) => of(AuthActions.AuthError({ error })))
      ),
    { dispatch: false }
  );

  sendVerificationEmail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.SendVerificationEmail),
      concatMap((payload) =>
        this._authService.sendVerificationEmail$(payload.user)
      ),
      map(() => AuthActions.SendVerificationEmailSuccess()),
      catchError((error) => of(AuthActions.AuthError({ error })))
    )
  );

  sendVerificationEmailSucess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.SendVerificationEmailSuccess),
        concatMap(() => this._router.navigateByUrl('verify-email-address'))
      ),
    { dispatch: false }
  );

  loginRequested$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.LoginRequested),
      concatMap((payload) =>
        this._authService.login$(payload.email, payload.password)
      ),
      concatMap((user) => this._authService.getUser$(user.user.uid)),
      map((user) => AuthActions.LoginSuccess({ user })),
      catchError((error) => of(AuthActions.AuthError({ error })))
    )
  );

  loginSucess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.LoginSuccess),
        concatMap((payload) =>
          this._router.navigate([payload.user.id, 'tasks'])
        )
      ),
    { dispatch: false }
  );

  loginFailed$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.LoginFailed),
        concatMap(() => this._router.navigateByUrl('login'))
      ),
    { dispatch: false }
  );

  AuthProviderLogin$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.AuthProviderLogin),
      concatMap((payload) =>
        this._authService.authProviderLogin$(payload.authProvider)
      ),
      switchMap((credentials) => {
        if (credentials.additionalUserInfo.isNewUser) {
          const user = this._authService.createUser(credentials.user);
          return [
            AuthActions.LoginSuccess({ user }),
            AuthActions.SaveUser({ user }),
          ];
        }

        return this._authService
          .getUser$(credentials.user.uid)
          .pipe(map((user) => AuthActions.LoginSuccess({ user })));
      }),
      catchError((error) => of(AuthActions.AuthError({ error })))
    )
  );

  forgotPasswordRequested$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.ForgotPasswordRequested),
      concatMap((payload) => this._authService.forgotPassword$(payload.email)),
      map(() => AuthActions.ForgotPasswordComplete()),
      catchError((error) => of(AuthActions.AuthError({ error })))
    )
  );

  ForgotPasswordComplete$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.ForgotPasswordComplete),
        tap(() =>
          this._snackBar.open('Password reset email sent, check your inbox.')
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.LogoutRequested),
      concatMap(() => this._authService.logout$()),
      map(() => AuthActions.LogoutCompleted()),
      catchError((error) => of(AuthActions.AuthError({ error })))
    )
  );

  logoutComplete$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.LogoutCompleted),
        concatMap(() => this._router.navigateByUrl('login'))
      ),
    { dispatch: false }
  );

  getUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.GetUser),
      concatMap(() => this._authService.getAuthState$()),
      take(1),
      switchMap((authUser) => {
        if (authUser) {
          return this._authService
            .getUser$(authUser.uid)
            .pipe(map((user) => AuthActions.LoginSuccess({ user })));
        }
        return [AuthActions.LoginFailed()];
      }),
      catchError((error) => of(AuthActions.AuthError({ error })))
    )
  );

  init$ = createEffect(() =>
    defer(() => {
      return of(AuthActions.GetUser());
    })
  );

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}
}
