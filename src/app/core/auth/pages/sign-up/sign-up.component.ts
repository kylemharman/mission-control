import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/reducers';
import { removeDocumentRef } from 'src/app/shared/helpers/firebase';
import { AuthService } from '../../auth.service';
import { LoginPageActions } from '../../store/actions';
import { AuthFacade } from '../../store/facades/auth.facade';

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

  constructor(
    private _authService: AuthService,
    private _authStore: AuthFacade,
    private _fb: FormBuilder
  ) {
    this.serverErrorMessage$ = this._authService.serverErrorMessage$;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit(): Promise<void> {
    await this._authService.signUp(
      this.email.value,
      this.password.value,
      this.fullname.value
    );
  }

  async googleSignUp(): Promise<void> {
    const user = await this._authService.googleSignIn();
    this._authStore.login(user);
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
