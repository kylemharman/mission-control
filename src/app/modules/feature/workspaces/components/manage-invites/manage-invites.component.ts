import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IMember, Roles } from '../../../../../core/models/member';
import { snapshot } from '../../../../../core/utils/rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'mc-manage-invites',
  templateUrl: './manage-invites.component.html',
  styleUrls: ['./manage-invites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageInvitesComponent {
  invites$: Observable<IMember[]>;

  constructor(
    private _auth: AuthService,
    private _workspace: WorkspaceService,
    private _router: Router
  ) {
    this.invites$ = this._auth.user$.pipe(
      switchMap(({ email }) => this._workspace.getUsersWorkspaceInvites$(email))
    );
  }

  async joinWorkspace(invite: IMember): Promise<void> {
    const user = await snapshot(this._auth.user$);
    const member = this._workspace.createWorkspaceMember(
      undefined,
      undefined,
      user
    );
    await this._workspace.saveWorkspaceMember(invite.workspaceUid, member);

    // add workspaceUid to auth claims
    await this._router.navigate([invite.uid, 'dashboard']);
  }

  createWorkspace(): void {}
}
