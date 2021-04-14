import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AuthService } from './auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WordDividerComponent } from './components/word-divider/word-divider.component';
import { AuthFormContainerComponent } from './components/auth-form-container/auth-form-container.component';
import { AuthPageContainerComponent } from './components/auth-page-container/auth-page-container.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/reducers';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    SignUpComponent,
    VerifyEmailComponent,
    WordDividerComponent,
    AuthFormContainerComponent,
    AuthPageContainerComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
  ],
  providers: [AuthService],
})
export class AuthModule {}
