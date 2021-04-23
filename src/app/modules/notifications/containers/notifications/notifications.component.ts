import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mc-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {
  constructor() {}
}
