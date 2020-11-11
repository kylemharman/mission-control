import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'mc-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent {
  user$: Observable<IUser>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  sendVerificationEmail(): void {
    this.auth.sendVerificationEmailMail();
  }
}
