import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
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

  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.serverErrorMessage$ = this.auth.serverErrorMessage$;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit(): Promise<void> {
    await this.auth.signIn(this.email.value, this.password.value);
  }

  async googleSignIn(): Promise<void> {
    await this.auth.googleSignIn();
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }
}