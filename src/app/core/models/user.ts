export interface IUser {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  colourTheme: string;
  darkMode: boolean;
  profileImage?: string;
}

export enum UserCollection {
  Tasks = 'tasks',
}
