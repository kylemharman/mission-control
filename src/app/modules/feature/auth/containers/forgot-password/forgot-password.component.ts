import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'mc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  serverErrorMessage$: Observable<string>;

  constructor(
    public auth: AuthService,
    private _fb: FormBuilder,
    private _auth: AuthService
  ) {
    this.serverErrorMessage$ = this.auth.serverErrorMessage$;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit(): Promise<void> {
    this._auth.forgotPassword(this.email.value);
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }
}
