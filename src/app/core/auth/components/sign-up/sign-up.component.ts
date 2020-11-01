import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'mc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
