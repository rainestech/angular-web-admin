import {Component, NgZone, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './../auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  errorPassword = '';
  errorEmail = '';
  returnUrl = '/dashboard';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone
  ) { }

  ngOnInit () {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  register() {
    this.router.navigate(['/auth/register']);
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.email, this.model.password)
        .subscribe(result => {
            if (result.success !== true) {
                // login failed
                this.error = 'Email or password is incorrect';
                this.loading = false;
            } else {
              return this.redirectLogin();
            }
        },
        err => {
            this.handleError (err);
            // console.log ( err );
            this.loading = false;
        });
  }

  private redirectLogin(): void {
    this.router.navigate([this.returnUrl]).then(nav => {
      console.log(nav);
    }, err => { console.log('error: ' + err); });
  }

  private handleError (resp) {
    console.log(resp);
    if (resp.error.error.hasOwnProperty('email')) {
      this.errorEmail = resp.error.error.email;
    } else if (resp.error.error.hasOwnProperty ('password')) {
      this.errorPassword = resp.error.error.password;
    } else {
      // console.log(resp.error);
      this.error = resp.error.error;
    }
  }

 }
