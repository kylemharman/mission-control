import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WorkspaceService } from '@misson-control/workspaces';

@Component({
  selector: 'mc-spaces-bar',
  templateUrl: './spaces-bar.component.html',
  styleUrls: ['./spaces-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacesBarComponent {
  constructor(public ws: WorkspaceService) {}
}
