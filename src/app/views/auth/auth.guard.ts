import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 import { JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  currentUser;
  token: string;
  // jwtHelper: JwtHelper;

  constructor(private router: Router) {
    // this.jwtHelper = new JwtHelper();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = localStorage.getItem('token');  // return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.token) {
         const jwtHelper: JwtHelper = new JwtHelper();

         if (jwtHelper.isTokenExpired(this.token)) {
           // console.log(jwtHelper.getTokenExpirationDate(this.token));
          return this.refreshToken(state);
        } else {
          return true;
        }
        // return true;
      }

      // not logged in so redirect to login page
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }

  // @todo
  refreshToken(state: RouterStateSnapshot) {
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
