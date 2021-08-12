import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { IMember, Member } from 'src/app/core/models/member';
import { RootCollection } from 'src/app/core/models/root-collection';
import {
  IWorkspace,
  Workspace,
  WorkspaceCollection,
} from 'src/app/core/models/workspace';
import { multiFilter } from 'src/app/core/utils/rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AuthService } from '../../auth/services/auth.service';
import { first } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  workspace$: Observable<IWorkspace | undefined>;
  member$: Observable<IMember | undefined>;

  constructor(
    private _db: FirestoreService,
    private _auth: AuthService,
    private _afs: AngularFirestore
  ) {
    this.workspace$ = this._auth.user$.pipe(
      concatMap((user) => user.getIdTokenResult()),
      switchMap(({ claims }) =>
        this._db.doc$<IWorkspace>(
          `${RootCollection.Workspaces}/${claims.currentWorkspaceUid}`
        )
      ),
      tap((workspace) => console.log('workspace: ', workspace))
    );
    this.member$ = this._auth.user$.pipe(
      withLatestFrom(this.workspace$),
      switchMap(([user, workspace]) =>
        this._db.col$<IMember>(
          `${RootCollection.Workspaces}/${workspace.uid}/${WorkspaceCollection.Members}`,
          (ref) => ref.where('userUid', '==', user.uid)
        )
      ),
      map((user) => first(user)),
      tap((user) => console.log('user: ', user))
    );
  }

  createWorkspace(name: string, createdBy: string): IWorkspace {
    const docRef = this._db
      .col<IWorkspace>(RootCollection.Workspaces)
      .doc<IWorkspace>(this._db.generateId());
    const uid = docRef.ref.id;

    return Workspace.init({ name, uid, createdBy });
  }

  async saveWorkspace(workspace: IWorkspace): Promise<void> {
    await this._db.set(
      `${RootCollection.Workspaces}/${workspace.uid}`,
      workspace
    );
  }

  createWorkspaceMember(
    workspaceUid: string,
    email: string,
    user?: firebase.User,
    isActive?: boolean,
    isAdmin?: boolean,
    isCreator?: boolean
  ): IMember {
    return Member.init({
      displayName: user.displayName ?? '',
      userUid: user.uid ?? '',
      workspaceUid,
      email,
      isAdmin,
      isCreator,
      isActive,
      profileImage: user.photoURL,
    });
  }

  async saveWorkspaceMember(
    workspaceUid: string,
    member: IMember
  ): Promise<void> {
    await this._db.add(
      `${RootCollection.Workspaces}/${workspaceUid}/${WorkspaceCollection.Members}`,
      member
    );
  }

  getUsersWorkspaceInvites$(email: string): Observable<IMember[] | undefined> {
    return this._afs
      .collectionGroup<IMember>(WorkspaceCollection.Members, (ref) =>
        ref.where('email', '==', email)
      )
      .valueChanges()
      .pipe(
        multiFilter((invite) => !invite.isActive),
        tap((invites) => console.log('invites :>> ', invites))
      );
  }
}
