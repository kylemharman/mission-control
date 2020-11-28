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
  selector: 'mc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  passwordHidden = true;
  serverErrorMessage$: Observable<string>;

  constructor(public auth: AuthService, private _fb: FormBuilder) {
    this.serverErrorMessage$ = this.auth.serverErrorMessage$;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit(): Promise<void> {
    await this.auth.signUp(
      this.email.value,
      this.password.value,
      this.fullname.value
    );
  }

  async googleSignUp(): Promise<void> {
    await this.auth.googleSignIn();
  }

  get fullname(): AbstractControl {
    return this.form.get('fullname');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }
}
