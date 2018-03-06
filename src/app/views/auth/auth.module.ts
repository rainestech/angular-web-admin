import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
// import {AuthService} from './auth.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Application Login'
    }
  },
  {
    path: 'recover',
    component: RecoverComponent,
    data: {
      title: 'Email Recovery'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Application Register'
    }
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    data: {
      title: 'Email Verification'
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule
  ],
  exports: [RouterModule],
  declarations: [
    LoginComponent,
    RecoverComponent,
    RegisterComponent,
    VerifyEmailComponent
  ]
  // providers: [AuthService]
})
export class AuthModule { }
