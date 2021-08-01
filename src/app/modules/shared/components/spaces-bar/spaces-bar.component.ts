import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'mc-spaces-bar',
  templateUrl: './spaces-bar.component.html',
  styleUrls: ['./spaces-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacesBarComponent {
  user$ = this._auth.user$;

  constructor(private _auth: AuthService) {}
}
