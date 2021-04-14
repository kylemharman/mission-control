import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { AuthState } from '../reducers';
import { isLoggedIn, user } from '../selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  isLoggedIn$ = this._store.select(isLoggedIn);
  user$ = this._store.select(user);

  constructor(private _store: Store<State | AuthState>) {
    this.user$.subscribe((d) => console.log(d));
  }
}
