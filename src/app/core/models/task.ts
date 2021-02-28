import { DocumentReference } from '@google-cloud/firestore';
import { AtLeast } from 'src/app/shared/helpers/common';
import { IUser } from './user';

export interface ITask {
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  // createdAt: moment;
  // updatedAt: moment;
  // creator: DocumentReference<IUser>;
  // AssignedTo: DocumentReference<IUser>[];
  // timeTracking: ;
  // dueDate: moment;
  // watchers: DocumentReference<IUser>[];
}

export enum TaskStatus {
  Open = 'open',
  Pending = 'pending',
  InProgress = 'in progress',
  Review = 'review',
  Done = 'done',
  Staged = 'staged',
  Released = 'relaseed',
  None = 'none',
}

export enum TaskPriority {
  Urgent = 'urgent',
  High = 'high',
  Normal = 'normal',
  Low = 'low',
  None = 'none',
}

export class Task {
  static init(overrides: AtLeast<ITask, 'name'>): ITask {
    return {
      description: '',
      status: TaskStatus.None,
      priority: TaskPriority.None,
      ...overrides,
    };
  }
}
