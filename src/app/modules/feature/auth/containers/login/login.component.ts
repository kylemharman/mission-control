import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';

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

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.serverErrorMessage$ = this._auth.serverErrorMessage$;
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
    if (this.form.valid) {
      const user = await this._auth.login(
        this.email.value,
        this.password.value
      );
      await this._loginNavigate(user.user);
    }
  }

  async googleSignIn(
    authProvider: 'google' | 'facebook' = 'google'
  ): Promise<void> {
    const user = await this._auth.authProviderLogin(authProvider);
    await this._loginNavigate(user.user);
  }

  private async _loginNavigate(user: firebase.User): Promise<void> {
    const lastWorkspaceUid = await this._auth.getUsersLastWorkspace(user);
    lastWorkspaceUid
      ? this._router.navigate([lastWorkspaceUid, 'dashboard'])
      : this._router.navigateByUrl('setup');
  }
}
