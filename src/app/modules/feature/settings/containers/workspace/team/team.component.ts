import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMember, IMemberRoles, multiMap, Roles } from '@misson-control/core';
import { WorkspaceService } from '@misson-control/workspaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface IMemberData extends Pick<IMember, 'path' | 'displayName' | 'email'> {
  role: Roles;
}

@Component({
  selector: 'mc-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements AfterViewInit, OnDestroy {
  private _onDestroy$: Subject<void> = new Subject();

  displayedColumns: string[] = ['name', 'email', 'role', 'settings'];
  dataSource: MatTableDataSource<IMemberData>;
  roles: IMemberRoles[] = [
    { type: Roles.Owner },
    { type: Roles.Member },
    { type: Roles.Admin },
  ];
  rolesControl = new FormControl('');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public ws: WorkspaceService) {
    this.ws
      .getAllWorkspaceMembers$()
      .pipe(
        multiMap((member) => this._getMemberData(member)),
        takeUntil(this._onDestroy$)
      )
      .subscribe((data) => (this.dataSource = new MatTableDataSource(data)));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  status(member: IMember): string {
    // need to update this, this could be Active, Pending, or Declined. Perhaps rename to Invite Status?
    return member.isActive ? 'Active' : 'Pending';
  }

  compareFn(m1: IMemberData, m2: IMemberData): boolean {
    return m1.email === m2.email;
  }

  private _getMemberData(member: IMember): IMemberData {
    return {
      path: member.path,
      displayName: member.displayName,
      email: member.email,
      role: this._role(member),
    };
  }

  private _role(member: IMember): Roles {
    if (member.isCreator) {
      return Roles.Owner;
    }
    return member.isAdmin ? Roles.Admin : Roles.Member;
  }
}
