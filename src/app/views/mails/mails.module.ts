import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailsComponent } from './mails.component';
import { ComposeComponent } from './compose/compose.component';
import { RequestComponent } from './request/request.component';
import { ContactsComponent } from './contacts/contacts.component';
import { Routes, RouterModule } from '@angular/router';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';

const routes: Routes = [
  {
    path: '',
    component: MailsComponent,
    data: {
      title: 'Mails'
    }
  },
  {
    path: 'compose',
    component: ComposeComponent,
    data: {
      title: 'Compose'
    }
  },
  {
    path: 'service-requests',
    component: RequestComponent,
    data: {
      title: 'Service Request'
    }
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: {
      title: 'Contact Messages'
    }
  }
];

@NgModule({
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  declarations: [
    MailsComponent,
    ComposeComponent,
    RequestComponent,
    ContactsComponent
  ],

  exports: [ RouterModule ]
})
export class MailsModule { }
