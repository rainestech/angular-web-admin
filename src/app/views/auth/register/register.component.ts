import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  error: any = {
    'username': '',
    'email': '',
    'password': '',
    'confirm_password': '',
    'server': ''
  };

  constructor(
    private router: Router,
    private authService: AuthService

  ) { }

  ngOnInit () {
    // reset login status
    this.authService.logout();
  }

  register() {
    this.loading = true;
    this.authService.register(this.model)
        .subscribe(result => {
            if (result.success === true) {
                // login successful
                this.router.navigate(['/verify-email']);
            } else {
                // login failed
                this.error.server = 'Registration Failed, please try again!';
                this.loading = false;
            }
        },
        erro => {
            this.handleError (erro);
            console.log ( erro.error );
            this.loading = false;
        });
  }

  private handleError (resp) {
    // resp.json();
    console.log ( resp );
    if (resp.error.hasOwnProperty('email')) {
      this.error.email = resp.error.email;
    } else if (resp.error.hasOwnProperty ('username')) {
      this.error.username = resp.error.username;
    } else if (resp.error.hasOwnProperty ('confirm_password')) {
      this.error.confirm_password = resp.error.confirm_password;
    } else if (resp.error.hasOwnProperty ('password')) {
      this.error.password = resp.error.password;
    } else {
      this.error.server = resp.error;
    }
  }
}
