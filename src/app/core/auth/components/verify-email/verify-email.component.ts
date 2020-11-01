import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'mc-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
