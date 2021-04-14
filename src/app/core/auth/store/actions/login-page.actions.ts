import { createAction, props } from '@ngrx/store';
import { WithRef } from 'src/app/shared/helpers/firebase';
import { IUser } from '../../../models/user';

enum LoginPageActions {
  Login = '[Login Page] login',
}

export const login = createAction(
  LoginPageActions.Login,
  props<{ user: IUser }>()
);
