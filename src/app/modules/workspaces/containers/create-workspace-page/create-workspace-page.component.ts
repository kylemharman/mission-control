import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { WorkspaceService } from '../../services/workspace.service';
import { snapshot } from 'src/app/core/utils/rxjs';

@Component({
  selector: 'mc-create-workspace-page',
  templateUrl: './create-workspace-page.component.html',
  styleUrls: ['./create-workspace-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWorkspacePageComponent {
  constructor(
    private _auth: AuthService,
    private _workspace: WorkspaceService
  ) {}

  async createWorkspace(name: string): Promise<void> {
    const user = await snapshot(this._auth.user$);
    const workspace = this._workspace.createWorkspace(name, user.uid);

    // Add workspace to auth claims
    // Setup workspace
  }
}
