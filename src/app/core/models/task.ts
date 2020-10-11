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
