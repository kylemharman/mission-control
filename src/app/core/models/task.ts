import { AtLeast } from 'src/app/shared/helpers/common';

export interface ITask {
  name: string;
  description: string;
  order: number;
  status: TaskStatus;
  priority: TaskPriority;
  tags: ITag[];
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  // creator: DocumentReference<IUser>;
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
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(),
      ...overrides,
    };
  }
}
