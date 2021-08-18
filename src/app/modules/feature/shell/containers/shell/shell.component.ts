import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '@misson-control/core';

@Component({
  selector: 'mc-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  constructor(public theme: ThemeService) {}
}
