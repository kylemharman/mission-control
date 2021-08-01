import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { WorkspaceService } from 'src/app/modules/workspaces/services/workspace.service';

@Injectable({ providedIn: 'root' })
export class IsWorkspaceMemberGuard implements CanActivate {
  constructor(private _workspace: WorkspaceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._workspace.member$.pipe(
      take(1),
      map((member) => !!member),
      tap((isWorkspaceUser) => {
        if (!isWorkspaceUser) {
          console.log('access denied');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}