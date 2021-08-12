import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { IMember } from 'src/app/core/models/member';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { snapshot } from 'src/app/core/utils/rxjs';
import { AuthService } from '../../../auth/services/auth.service';
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
    private _workspace: WorkspaceService,
    private _router: Router,
    private _db: FirestoreService
  ) {
    this.workspaceInvites$ = this.user$.pipe(
      switchMap(({ email }) => this._workspace.getUsersWorkspaceInvites$(email))
    );
  }

  async setupWorkspace(name: string): Promise<void> {
    const user = await snapshot(this._auth.user$);
    const workspace = this._workspace.createWorkspace(name, user.uid);
    const member = this._workspace.createWorkspaceMember(
      workspace.uid,
      user.email,
      user,
      true,
      true,
      true
    );
    await this._workspace.saveWorkspace(workspace);
    await this._workspace.saveWorkspaceMember(workspace.uid, member);
    await this._db.httpsCallable('setCustomClaims', {
      currentWorkspaceUid: workspace.uid,
    });
    await this._auth.refreshToken();
    await this._router.navigate([workspace.uid, 'dashboard']);
  }
}
