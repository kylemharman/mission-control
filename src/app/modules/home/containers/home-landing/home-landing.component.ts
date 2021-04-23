import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mc-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
