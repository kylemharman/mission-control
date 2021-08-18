import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from '@misson-control/auth';
import { moduleMetadata, Story } from '@storybook/angular';
import { Meta } from '@storybook/angular/types-6-0';
import * as firebase from 'firebase';
import { of } from 'rxjs';
import { AvatarComponent } from './avatar.component';

const user: Partial<firebase.User> = {
  displayName: 'Bacon Joe Daviderson',
  photoURL:
    'https://images.unsplash.com/photo-1606679157376-2005fbd804f8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
};

const metadata = {
  title: 'Shared/Avatar',
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      declarations: [AvatarComponent],
      imports: [FlexLayoutModule, LayoutModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            user$: of(user),
          },
        },
      ],
    }),
  ],
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
} as Meta;

export default metadata;

export const avatatWithInitals = () => ({
  component: metadata.component,
  props: {
    diameter: 50,
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: AuthService,
          useValue: {
            user$: of(user.displayName),
          },
        },
      ],
    }),
  ],
  template: '<mc-avatar></mc-avatar>',
});

export const avatatWithImage = () => ({
  component: metadata.component,
  props: {
    diameter: 50,
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: AuthService,
          useValue: {
            user$: of(user.photoURL),
          },
        },
      ],
    }),
  ],
  template: '<mc-avatar></mc-avatar>',
});
