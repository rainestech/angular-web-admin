import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { HttpService } from './../../../services/http.service';

@Component({
  templateUrl: './recover.component.html'
})
export class RecoverComponent implements OnInit {

  model: any = {};
  loading = false;
  success = false;
  error: string;
  message = '';
  loginRe =  false;
  resendRe =  false;
  codeError = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpService
  ) { }

  ngOnInit () {
    // reset login status
    this.authService.logout();
  }

  recover() {
    this.loading = true;
    this.loginRe = false;
    this.resendRe = false;
    // const url = 'http://web.dev/api/v1/recover/' + this.model;
    const url  = 'http://web.dev/api/v1/recover';
    // alert(url);
    this.http.post(this.model, url, true)
    .subscribe(result => {
        if (result.success === true) {
            this.message = result.message;
            this.resendRe = true;
            this.loading = false;
            this.success = true;
        } else {
            // login failed
            this.message = result.error;
            this.resendRe = true;
            this.loading = false;
        }
    },
    erro => {
        this.handleError (erro);
        // console.log ( erro.error );
        this.loading = false;
    });
  }

  reset() {
    this.message = '';
    this.loading = true;
    this.loginRe = false;
    this.resendRe = false;
    this.error = '';
    // const url = 'http://web.dev/api/v1/recover/' + this.model;
    const url  = 'http://web.dev/api/v1/reset';
    // alert(url);
    this.http.post(this.model, url, true)
    .subscribe(result => {
        if (result.success === true) {
            this.message = result.message;
            this.resendRe = true;
            this.loading = false;
            this.success = true;
        } else {
            // login failed
            this.message = result.error;
            this.resendRe = true;
            this.loading = false;
        }
    },
    erro => {
        this.handleError (erro);
        // console.log ( erro.error );
        this.loading = false;
    });
  }

  private handleError (resp) {
    // console.log ( resp );
    if (resp === Object(resp) && resp.hasOwnProperty('message')) {
      this.message = resp.message;
      this.resendRe = true;
    } else if (resp === Object(resp) && resp.hasOwnProperty('error')) {
      const err = resp.error;
      if (err.hasOwnProperty('email')) {
        this.error = err.email;
      } else if (err.hasOwnProperty('email')) {
        this.error = err.email;
      } else  {
        this.error = err;
      }
      // console.log ( resp );
    } else {
      this.message = 'Verification Failed, please try again! Ensure you have the correct code';
      // this.error = resp.statusText;
      this.resendRe = true;
    }
  }
}
