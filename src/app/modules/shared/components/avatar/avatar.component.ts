import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { first, last } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/feature/auth/services/auth.service';

@Component({
  selector: 'mc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() diameter = 32;
  userInitials$: Observable<string>;
  userProfileImage$: Observable<string>;

  constructor(private _auth: AuthService) {
    this.userInitials$ = this._auth.user$.pipe(
      map((user) => {
        if (!user) {
          return;
        }
        return this._getInitials(user.displayName);
      })
    );
    this.userProfileImage$ = this._auth.user$.pipe(
      map((user) => {
        if (!user) {
          return;
        }
        return user.photoURL;
      })
    );
  }

  @HostBinding('style.width')
  @HostBinding('style.height')
  get size(): string {
    return `${this.diameter}px`;
  }

  private _getInitials(name: string): string {
    const initials: RegExpMatchArray = name.match(/\b(\w)/g) || [];

    if (initials.length > 1) {
      return `${first(initials)}${last(initials)}`.toUpperCase();
    }

    return initials.join('').toUpperCase();
  }
}
