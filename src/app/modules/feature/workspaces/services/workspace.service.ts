import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { first } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { concatMap, map, switchMap, take, tap } from 'rxjs/operators';
import { IMember, Member } from 'src/app/core/models/member';
import { RootCollection } from 'src/app/core/models/root-collection';
import {
  IWorkspace,
  Workspace,
  WorkspaceCollection,
} from 'src/app/core/models/workspace';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { multiFilter } from 'src/app/core/utils/rxjs';

import { AuthService } from '../../auth/services/auth.service';

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
      take(1),
      concatMap((user) => user.getIdTokenResult()),
      switchMap(({ claims }) =>
        this._db.doc$<IWorkspace>(
          `${RootCollection.Workspaces}/${claims.currentWorkspaceUid}`
        )
      )
    );
    this.member$ = combineLatest([this._auth.user$, this.workspace$]).pipe(
      switchMap(([user, workspace]) =>
        this._db.col$<IMember>(
          `${RootCollection.Workspaces}/${workspace.uid}/${WorkspaceCollection.Members}`,
          (ref) => ref.where('userUid', '==', user.uid)
        )
      ),
      map((user) => first(user))
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

  getWorkspace$(workspaceUid: string): Observable<IWorkspace> {
    return this._db.doc$(`${RootCollection.Workspaces}/${workspaceUid}`);
  }

  createWorkspaceMember(
    workspace: IWorkspace,
    email: string,
    user?: firebase.User,
    isActive?: boolean,
    isAdmin?: boolean,
    isCreator?: boolean
  ): IMember {
    return Member.init({
      workspaceUid: workspace.uid,
      workspaceName: workspace.name,
      email,
      displayName: user ? user.displayName : '',
      profileImage: user ? user.photoURL : '',
      userUid: user ? user.uid : '',
      isAdmin,
      isCreator,
      isActive,
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

  async updateWorkspaceMember(member: IMember): Promise<void> {
    await this._db.update<IMember>(member.path, member);
  }

  getAllWorkspaceMembers$(): Observable<IMember[]> {
    return this.workspace$.pipe(
      switchMap((workspace) =>
        this._db.col$<IMember>(
          `${RootCollection.Workspaces}/${workspace.uid}/${WorkspaceCollection.Members}`
        )
      )
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
