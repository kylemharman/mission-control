import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../../models/user';
import { AuthActions, LoginPageActions } from '../actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: IUser | undefined;
  // loaded: boolean;
}

export const initialAuthState: AuthState = {
  user: undefined,
  // loaded: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(LoginPageActions.login, (_state, action) => {
    return { user: action.user };
  }),
  on(AuthActions.logout, (_state, _action) => {
    return { user: undefined };
  })
);
