import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@misson-control/auth';
import { FirestoreService, IMember, snapshot } from '@misson-control/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'mc-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupComponent {
  user$ = this._auth.user$;
  workspaceInvites$: Observable<IMember[] | undefined>;

  constructor(
    private _auth: AuthService,
    private _ws: WorkspaceService,
    private _router: Router,
    private _db: FirestoreService
  ) {
    this.workspaceInvites$ = this.user$.pipe(
      switchMap(({ email }) => this._ws.getUsersWorkspaceInvites$(email))
    );
  }

  async setupWorkspace(name: string): Promise<void> {
    const user = await snapshot(this._auth.user$);
    const workspace = this._ws.createWorkspace(name, user.uid);
    const member = this._ws.createWorkspaceMember(
      workspace,
      user.email,
      user,
      true,
      true,
      true
    );
    await this._ws.saveWorkspace(workspace);
    await this._ws.saveWorkspaceMember(workspace.uid, member);
    await this._db.httpsCallable('setCustomClaims', {
      currentWorkspaceUid: workspace.uid,
    });
    await this._auth.refreshToken();
    await this._router.navigate([workspace.uid, 'dashboard']);
  }

  async joinWorkspace(invite: IMember): Promise<void> {
    const user = await snapshot(this._auth.user$);

    await this._ws.updateWorkspaceMember({
      ...invite,
      displayName: user.displayName,
      isActive: true,
      profileImage: user.photoURL ?? '',
      userUid: user.uid,
    });
    await this._db.httpsCallable('setCustomClaims', {
      currentWorkspaceUid: invite.workspaceUid,
    });
    await this._auth.refreshToken();
    await this._router.navigate([invite.workspaceUid, 'dashboard']);
  }
}
