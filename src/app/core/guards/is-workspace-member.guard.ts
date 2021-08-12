import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, map, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IsWorkspaceMemberGuard implements CanActivate {
  constructor(private _afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._afAuth.authState.pipe(
      take(1),
      concatMap((user) => user.getIdTokenResult()),
      map(
        (token) =>
          token.claims.currentWorkspaceUid ===
          route.paramMap.get('workspaceUid')
      ),
      tap((hasAccess) => {
        if (!hasAccess) {
          console.log('user does not have access to requested workspace');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
