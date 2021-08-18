import { ChangeDetectionStrategy, Component } from '@angular/core';
import { snapshot } from '@misson-control/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'mc-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent {
  user$ = this._auth.user$;

  constructor(private _auth: AuthService) {}

  async sendVerificationEmail(): Promise<void> {
    const user = await snapshot(this._auth.user$);
    this._auth.sendVerificationEmail(user);
  }
}
