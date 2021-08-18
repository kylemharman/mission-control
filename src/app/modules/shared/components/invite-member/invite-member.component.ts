import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@misson-control/auth';
import { IMemberRoles, Roles, snapshot } from '@misson-control/core';
import { WorkspaceService } from '@misson-control/workspaces';

@Component({
  selector: 'mc-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteMemberComponent implements OnInit {
  form: FormGroup;
  roles: IMemberRoles[] = [{ type: Roles.Member }, { type: Roles.Admin }];

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _ws: WorkspaceService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: [Roles.Member, Validators.required],
    });
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }
  get role(): AbstractControl {
    return this.form.get('role');
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const workspace = await snapshot(this._ws.workspace$);
      const isAdmin = this.role.value === Roles.Admin;
      const member = this._ws.createWorkspaceMember(
        workspace,
        this.email.value,
        undefined,
        false,
        isAdmin,
        false
      );
      await this._auth.inviteMember(this.email.value);
      await this._ws.saveWorkspaceMember(workspace.uid, member);
    }
  }
}
