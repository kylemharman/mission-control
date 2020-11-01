import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'mc-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
