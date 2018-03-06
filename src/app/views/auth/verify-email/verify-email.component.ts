import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './../../../services/http.service';
import { AuthService } from './../auth.service';

@Component({
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit {
  model: any = {};
  loading = false;
  success = false;
  error: string;
  message = '';
  loginRe =  false;
  resendRe =  false;

  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  verify() {
    this.loading = true;
    this.loginRe = false;
    this.resendRe = false;
    // const url = 'http://web.dev/api/v1/verify/' + this.model;
    const url  = 'http://web.dev/api/v1/verify';
    // alert(url);
    this.http.post(this.model, url, true)
    .subscribe(result => {
        if (result.success === true) {
            this.message = result.message;
            this.loginRe = true;
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

  login() {
    this.router.navigate(['/auth/login']);
  }

  resend() {
    this.router.navigate(['/auth/forget-password']);
  }

  private handleError (resp) {
    // console.log ( resp );
    if (resp === Object(resp) && resp.hasOwnProperty('message')) {
      this.error = resp.message;
    } else if (resp === Object(resp) && resp.hasOwnProperty('error')) {
      this.error = resp.error.verifyEmail;
    } else {
      this.message = 'Verification Failed, please try again! Ensure you have the correct code';
      this.resendRe = true;
      this.error = resp.statusText;
    }
  }

}
