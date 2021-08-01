import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { IMember, Member } from 'src/app/core/models/member';
import { RootCollection } from 'src/app/core/models/root-collection';
import {
  IWorkspace,
  Workspace,
  WorkspaceCollection,
} from 'src/app/core/models/workspace';
import { multiFilter, snapshot } from 'src/app/core/utils/rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  workspace$: Observable<IWorkspace>;
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
      )
    );
    this.member$ = this._auth.user$.pipe(
      withLatestFrom(this.workspace$),
      switchMap(([user, workspace]) =>
        this._db.doc$<IMember>(
          `${RootCollection.Workspaces}/${workspace.uid}/${WorkspaceCollection.Members}/${user.uid}`
        )
      )
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
      userUid: user.uid ?? '',
      displayName: user.displayName ?? '',
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
    await this._db.set(
      `${RootCollection.Workspaces}/${workspaceUid}/${WorkspaceCollection.Members}/${member.uid}`,
      member
    );
  }

  getUsersWorkspaceInvites$(email: string): Observable<IMember[] | undefined> {
    return this._afs
      .collectionGroup<IMember>(WorkspaceCollection.Members, (ref) =>
        ref.where('email', '==', email)
      )
      .valueChanges()
      .pipe(multiFilter((invite) => !invite.isActive));
  }
}
