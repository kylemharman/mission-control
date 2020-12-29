import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { filterUndefined } from 'src/app/shared/helpers/rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'mc-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent {
  user$: Observable<IUser>;

  constructor(private _user: UserService, private _auth: AuthService) {
    this.user$ = this._user.user$.pipe(filterUndefined());
  }

  sendVerificationEmail(): void {
    this._auth.sendVerificationEmailMail();
  }
}
