import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { first, last } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkspaceService } from 'src/app/modules/feature/workspaces/services/workspace.service';

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

  constructor(private _ws: WorkspaceService) {
    this.userInitials$ = this._ws.member$.pipe(
      map((member) => {
        if (!member) {
          return;
        }
        return this._getInitials(member.displayName);
      })
    );
    this.userProfileImage$ = this._ws.member$.pipe(
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
