import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../../models/user';
import { LoginPageActions } from '../actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: IUser | undefined;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(LoginPageActions.login, (_state, action) => {
    console.log('action :>> ', action);
    return { user: action.user };
  })
);
