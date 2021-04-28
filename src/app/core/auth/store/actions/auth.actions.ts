import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/core/models/user';

export const SignUpRequested = createAction(
  '[Auth] Sign Up Requested',
  props<{ username: string; email: string; password: string }>()
);

export const SignUpCompleted = createAction('[Auth] Sign Up Completed');

export const SignUpFailed = createAction(
  '[Auth] Sign Up Failed',
  props<{ error: unknown }>()
);

export const SendVerificationEmail = createAction(
  '[Auth] Auth Send Verification Email',
  props<{ user: firebase.User }>()
);

export const SendVerificationEmailSuccess = createAction(
  '[Auth] Auth Send Verification Email Success'
);

export const UpdateProfile = createAction(
  '[Auth] Update Profile',
  props<{ displayName: string; profileImage: string }>()
);

export const UpdateProfileSuccess = createAction(
  '[Auth] Update Profile Success',
  props<{ user: IUser }>()
);

export const LoginRequested = createAction(
  '[Auth] Login Requested',
  props<{ email: string; password: string }>()
);

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: IUser }>()
);

export const LoginFailed = createAction('[Auth] Login Failed');

export const AuthProviderLogin = createAction(
  '[Auth] Auth Provider Login',
  props<{ authProvider: 'google' | 'facebook' }>()
);

export const ForgotPasswordRequested = createAction(
  '[Auth] Forgot Password Requested',
  props<{ email: string }>()
);

export const ForgotPasswordComplete = createAction(
  '[Auth] Forgot Password Complete'
);

export const LogoutRequested = createAction('[Auth] Logout Requested');
export const LogoutCompleted = createAction('[Auth] Logout Completed');

export const SaveUser = createAction(
  '[Auth] Save User',
  props<{ user: IUser }>()
);

export const GetUser = createAction('[Auth] Get User');

export const AuthError = createAction(
  '[Auth] Error',
  props<{ error: unknown }>()
);
