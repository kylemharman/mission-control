import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../models/user';

export const login = createAction(
  '[Auth/Login Page] login',
  props<{ user: IUser }>()
);
