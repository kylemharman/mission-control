import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../models/user';

enum LoginPageActions {
  Login = '[Login Page] login',
}

export const login = createAction(
  LoginPageActions.Login,
  props<{ user: IUser }>()
);
