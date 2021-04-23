import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  passwordHidden = true;
  serverErrorMessage$: Observable<string>;

  constructor(private _authService: AuthService, private _fb: FormBuilder) {
    this.serverErrorMessage$ = this._authService.serverErrorMessage$;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  async onSubmit(): Promise<void> {
    await this._authService.login(this.email.value, this.password.value);
  }

  async googleSignIn(): Promise<void> {
    await this._authService.googleSignIn();
  }

  // onGoogleLogin(): void {
  //   this.store.dispatch(new AuthActions.GoogleLogin());
  // }

  // onLoginWithCredentials(credentials: { email: string, password: string, name: string }): void {
  //   this.store.dispatch(new AuthActions.CredentialsLogin(credentials.email, credentials.password, credentials.rememberMe));
  // }
}
