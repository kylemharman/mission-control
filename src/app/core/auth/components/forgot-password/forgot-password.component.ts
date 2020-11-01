import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'mc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
