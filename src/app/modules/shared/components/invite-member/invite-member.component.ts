import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IMemberRoles, Roles } from 'src/app/core/models/member';
import { snapshot } from 'src/app/core/utils/rxjs';
import { AuthService } from 'src/app/modules/feature/auth/services/auth.service';
import { WorkspaceService } from 'src/app/modules/feature/workspaces/services/workspace.service';

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
    private _workspace: WorkspaceService
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
      const workspace = await snapshot(this._workspace.workspace$);
      const isAdmin = this.role.value === Roles.Admin;
      const member = this._workspace.createWorkspaceMember(
        workspace.uid,
        this.email.value,
        undefined,
        undefined,
        isAdmin
      );
      await this._auth.inviteMember(this.email.value);
      await this._workspace.saveWorkspaceMember(workspace.uid, member);
    }
  }
}
