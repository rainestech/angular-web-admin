import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './views/auth/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
];

// Import components
import {
  AppAsideComponent,
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarFormComponent,
  SidebarHeaderComponent,
  SidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppComponent,
  AppAsideComponent,
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarFormComponent,
  SidebarHeaderComponent,
  SidebarMinimizerComponent,
  APP_SIDEBAR_NAV
];

// Import directives
import {
  AsideDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES,
  CUSTOM_VALIDATORS
} from './directives';

const APP_DIRECTIVES = [
  AsideDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES,
  CUSTOM_VALIDATORS
];

// Import routing module
import { AppRoutingModule } from './app-routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

// Import Services
import { AuthGuard } from './views/auth/auth.guard';
import {MailService} from './views/mails/mail.service';
import {AuthService} from './views/auth/auth.service';

// Loader
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// Toaster Module
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ToastrModule.forRoot({
      maxOpened: 2,
      timeOut: 10000,
      autoDismiss: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    AuthGuard,
    MailService,
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
