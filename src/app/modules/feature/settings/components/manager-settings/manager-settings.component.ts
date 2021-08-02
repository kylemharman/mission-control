import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mc-manager-settings',
  templateUrl: './manager-settings.component.html',
  styleUrls: ['./manager-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
