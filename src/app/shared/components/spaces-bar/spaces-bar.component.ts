import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mc-spaces-bar',
  templateUrl: './spaces-bar.component.html',
  styleUrls: ['./spaces-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacesBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
