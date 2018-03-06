import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// import { HttpInterceptor } from './../../services/http.interceptor';

@Injectable()
export class HttpService {
    public token: string;
    public cache: object;

    constructor(private http: HttpClient) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    post(data: object, url: string, resp = true): Observable<any> {
        return this.http.post(url, JSON.stringify(data))
            .map((response: Response) => {
              // if (response.json() && response.json().cache) {
              //     // store in local storage to keep user logged in between page refreshes
              //     localStorage.setItem('currentUser', JSON.stringify({ user: response.json().data.user, token: token }));

              //     // return true to indicate successful login
              //     return true;
              // }
              if (resp) {
                  // return false to indicate failed login
                  // return false;
                  return response;
              } else {
                return true;
              }
            }).catch(( err: Response ) => {
              return Observable.throw( err );
            });
    }

    get(url: string, fresh = true): Observable<any> {
      const cache = JSON.parse(localStorage.getItem(url));
      this.cache = cache;
      if (fresh === false && cache !== null) {
        return cache;
      } else {
        this.http.get(url)
        .map((response: any) => {
          if (response.cache) {
            this.cache = response;
          }
          console.log(cache);
          return response;
        }).catch(( erro: Response ) => {
          return Observable.throw( erro );
        });
      }
  }
}
