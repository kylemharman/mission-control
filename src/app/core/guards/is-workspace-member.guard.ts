import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { WorkspaceService } from 'src/app/modules/feature/workspaces/services/workspace.service';

@Injectable({ providedIn: 'root' })
export class IsWorkspaceMemberGuard implements CanActivate {
  constructor(private _workspace: WorkspaceService, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._workspace.member$.pipe(
      tap((user) => console.log('user: ', user)),
      take(1),
      map((member) => !!member),
      tap((isWorkspaceUser) => {
        console.log('isWorkspaceUser :>> ', isWorkspaceUser);
        if (!isWorkspaceUser) {
          console.log('access denied');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
