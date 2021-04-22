import { AtLeast } from 'src/app/shared/helpers/common';
import { ITimestamp } from 'src/app/shared/helpers/time';

export interface ITask {
  id: string;
  path: string;
  name: string;
  description: string;
  order: number;
  status: TaskStatus;
  priority: TaskPriority;
  tags: ITag[];
  dueDate?: ITimestamp;
  // creator: INameDoc<IUser>;
  // AssignedTo: INameDoc<IUser>[];
  // timeTracking: TimeStamp;
  // watchers: INameDoc<IUser>[];
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
  static init(
    overrides: AtLeast<ITask, 'name' | 'order' | 'id' | 'path'>
  ): ITask {
    return {
      description: '',
      status: TaskStatus.None,
      priority: TaskPriority.None,
      tags: [],
      ...overrides,
    };
  }
  static compareTasks(t1: ITask, t2: ITask): 1 | -1 | 0 {
    const compare = t1.order - t2.order;

    if (compare > 0) {
      return 1;
    } else if (compare < 0) {
      return -1;
    } else return 0;
  }
}
