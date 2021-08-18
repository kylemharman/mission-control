import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { first, last } from 'lodash';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMember } from 'src/app/core/models/member';

@Component({
  selector: 'mc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  member$: ReplaySubject<IMember> = new ReplaySubject(1);
  memberInitials$: Observable<string>;
  memberProfileImage$: Observable<string>;
  @Input() diameter = 32;

  @Input()
  set member(member: IMember) {
    if (member) {
      this.member$.next(member);
    }
  }

  constructor() {
    this.memberInitials$ = this.member$.pipe(
      map((member) => {
        if (!member) {
          return;
        }
        return this._getInitials(member.displayName);
      })
    );
    this.memberProfileImage$ = this.member$.pipe(
      map((member) => {
        if (!member) {
          return;
        }
        return member.profileImage;
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
