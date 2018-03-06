import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './../containers';

// Import RouteGuard
import { AuthGuard } from './../views/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './../views/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'invoice',
        loadChildren: './../views/invoice/invoice.module#InvoiceModule',
      },
      {
        path: 'mails',
        loadChildren: './../views/mails/mails.module#MailsModule',
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'Application Authentication'
    },
    children: [
      {
        path: 'auth',
        loadChildren: './../views/auth/auth.module#AuthModule'
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
