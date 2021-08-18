import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';

import { NgMaterialModule } from '../ng-material/material.module';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CloseButtonComponent } from './components/buttons/close-button/close-button.component';
import { MainButtonComponent } from './components/buttons/main-button/main-button.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { InviteMemberComponent } from './components/invite-member/invite-member.component';
import { TimeSelectorComponent } from './components/time-selector/time-selector.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { UserSettingsMenuComponent } from './components/user-settings-menu/user-settings-menu.component';
import { WordDividerComponent } from './components/word-divider/word-divider.component';
import { ContentContainerComponent } from './layout/content-container/content-container.component';

const components = [
  MainButtonComponent,
  UserSettingsMenuComponent,
  AvatarComponent,
  ToggleComponent,
  CloseButtonComponent,
  TimeSelectorComponent,
  DateSelectorComponent,
  ContentContainerComponent,
  WordDividerComponent,
  InviteMemberComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NgMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    MomentModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class SharedModule {}
