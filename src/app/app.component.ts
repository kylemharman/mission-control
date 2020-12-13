import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public theme: ThemeService) {}
}
