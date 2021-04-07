import { AtLeast } from 'src/app/shared/helpers/common';
import { ITimestamp } from 'src/app/shared/helpers/time';

export interface ITask {
  name: string;
  description: string;
  order: number;
  status: TaskStatus;
  priority: TaskPriority;
  tags: ITag[];
  dueDate?: ITimestamp;
  // creator: AngularFirestoreDocument<IUser>;
  // AssignedTo: DocumentReference<IUser>[];
  // timeTracking: ;
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

// TODO - move tags to thier own class/model
export interface ITag {
  name: string;
  hexColour: string;
}
export class Task {
  static init(overrides: AtLeast<ITask, 'name' | 'order'>): ITask {
    return {
      description: '',
      status: TaskStatus.None,
      priority: TaskPriority.None,
      tags: [],
      ...overrides,
    };
  }
}
