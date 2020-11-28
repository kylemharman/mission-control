import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'mc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() size: number;
  userInitials$: Observable<string>;
  userProfileImage$: Observable<string>;

  constructor(private _user: UserService) {
    this.userInitials$ = this._user.user$.pipe();
  }
}
