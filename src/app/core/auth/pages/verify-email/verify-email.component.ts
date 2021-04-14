import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user';
import { filterUndefined } from 'src/app/shared/helpers/rxjs';
import { AuthService } from '../../auth.service';
import { AuthFacade } from '../../store/facades/auth.facade';

@Component({
  selector: 'mc-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent {
  user$: Observable<IUser>;

  constructor(private _auth: AuthFacade, private _authService: AuthService) {
    this.user$ = this._auth.user$;
  }

  sendVerificationEmail(): void {
    this._authService.sendVerificationEmailMail();
  }
}
