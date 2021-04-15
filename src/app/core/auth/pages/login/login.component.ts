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
    private _store: Store<State>
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
    const user = await this._auth.signIn(this.email.value, this.password.value);
    this._store.dispatch(
      LoginPageActions.login({ user: removeDocumentRef(user) })
    );
  }

  async googleSignIn(): Promise<void> {
    const user = await this._auth.googleSignIn();

    this._store.dispatch(
      LoginPageActions.login({ user: removeDocumentRef(user) })
    );
  }
}
