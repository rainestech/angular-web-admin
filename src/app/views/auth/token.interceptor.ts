import {Injectable, Injector} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private inj: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    if (token === null) {
      return next.handle(request);
    }

    const authService = this.inj.get(AuthService);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // console.log(request.headers.get('Authorization'));
    return next.handle(request)

      .do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          const authorization = event.headers.get('Authorization');
          // console.log(authorization);
          if (event.headers.get('Authorization')) {
            authService.removeBearer(authorization, true);
          }
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      })

      .catch((err: HttpErrorResponse) => {
      if ( err.error instanceof Error ) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', err.error.message);
      } else if (err.status === 401) {
        this.router.navigate(['/auth/login']);
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
      }

      // ...optionally return a default fallback value so app can continue (pick one)
      // which could be a default value
      // return Observable.of({my: "default value..."});
      // or simply an empty observable
      // return Observable.empty();
      return Observable.throw(err);
    });
  }
}
