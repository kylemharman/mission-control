import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mc-manager-user-settings',
  templateUrl: './manager-user-settings.component.html',
  styleUrls: ['./manager-user-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerUserSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
