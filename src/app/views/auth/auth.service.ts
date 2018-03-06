import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {split} from 'ts-node/dist';

@Injectable()
export class AuthService {
    public token: string;
    public error: object;

    constructor(private http: HttpClient) {
        // set token if saved in local storage
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = localStorage.getItem('token');
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post('http://web.test/api/v1/login', JSON.stringify({ email: email, password: password }))
            .map((response: any) => {
              // login successful if there's a jwt token in the response
              // console.log(response.data);
              const token = response.data.token;
              if (token) {
                  // set token property
                  this.token = token;

                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify({ user: response.data.user }));
                  localStorage.setItem('token', token);

                  // return true to indicate successful login
                  return response;
              }
            }).catch(( err: Response ) => {
              console.log(err);
              return Observable.throw( err );
            });
    }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
  }

  register(regData: object): Observable<any> {
    return this.http.post('http://web.dev/api/v1/register', JSON.stringify(regData))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      }).catch(( erro: Response ) => {
        return Observable.throw( erro.json() );
      });
  }

  getToken() {
    return this.token;
  }

  removeBearer(tokenString, set = false) {
    const [bearer, token] = tokenString.split(' ');

    if (set === true) {
      return this.setToken(token);
    }
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }


  ping(): Observable<any> {
    return this.http.get('http://web.test/api/v1/test')
      .map((result: any) => {
        return result;
      })
      .catch((err: Response) => {
        return Observable.throw(err);
      });
  }
}
