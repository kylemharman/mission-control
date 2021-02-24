import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

import { filterUndefined } from '../../helpers/rxjs';

@Component({
  selector: 'mc-spaces-bar',
  templateUrl: './spaces-bar.component.html',
  styleUrls: ['./spaces-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacesBarComponent {
  user$: Observable<IUser>;

  constructor(private _user: UserService, private _router: Router) {
    this.user$ = this._user.user$.pipe(filterUndefined());
  }
}
