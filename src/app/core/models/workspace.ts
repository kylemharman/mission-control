import { AtLeast } from 'src/app/core/utils/common';

export enum WorkspaceCollection {
  Members = 'members',
  Tasks = 'tasks',
}

export interface IWorkspace {
  uid: string;
  name: string;
  createdBy: string;
}

export class Workspace {
  static init(overrides: Partial<IWorkspace>): IWorkspace {
    return {
      uid: '',
      name: '',
      createdBy: '',
      ...overrides,
    };
  }
}
