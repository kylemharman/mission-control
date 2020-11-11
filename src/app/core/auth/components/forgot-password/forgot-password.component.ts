import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'mc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  serverErrorMessage$: Observable<string>;

  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.serverErrorMessage$ = this.auth.serverErrorMessage$;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit(): Promise<void> {
    await this.auth.forgotPassword(this.email.value);
  }

  get email() {
    return this.form.get('email');
  }
}
