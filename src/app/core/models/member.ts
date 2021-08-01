import { AtLeast } from 'src/app/core/utils/common';

export interface IMember {
  uid: string;
  path: string;
  userUid: string;
  workspaceUid: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  isCreator: boolean;
  isActive: boolean;
  profileImage?: string;
}

export enum Roles {
  Admin = 'Admin',
  Member = 'Member',
  Owner = 'Owner',
}

export interface IMemberRoles {
  type: Roles;
}

export class Member {
  static init(overrides: AtLeast<IMember, 'email' | 'workspaceUid'>): IMember {
    return {
      displayName: '',
      uid: '',
      userUid: '',
      path: '',
      isCreator: false,
      isAdmin: false,
      isActive: false,
      ...overrides,
    };
  }
}
