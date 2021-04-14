import { createAction } from '@ngrx/store';

enum AuthActions {
  Logout = '[Auth] logout',
}

export const logout = createAction(AuthActions.Logout);
