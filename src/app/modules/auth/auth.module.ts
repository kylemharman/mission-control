import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgMaterialModule } from 'src/app/ng-material/ng-material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageContainerComponent } from './components/auth-page-container/auth-page-container.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginComponent } from './containers/login/login.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { VerifyEmailComponent } from './containers/verify-email/verify-email.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    SignUpComponent,
    VerifyEmailComponent,
    AuthPageContainerComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}