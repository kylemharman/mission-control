import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/core/models/user';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: IUser }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: unknown }>()
);

export const loginRedirect = createAction('[Auth/API] Login Redirect');
