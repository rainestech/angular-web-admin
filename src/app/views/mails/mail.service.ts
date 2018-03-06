import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class Mail {
  id: number;
  sender: string;
  recipient: string;
  html: string;
  reply: number;
  subject: string;
}


@Injectable()
export class MailService {

  private mailUrl = 'http://web.test/api/mails';

  constructor(private http: HttpClient) {}

   getMails(link): Observable<Mail[]> {
    return this.http.get(link ? link : this.mailUrl)
    .map((res) => {
      return res;
    })
    .catch( err => {
      return Observable.throw(err);
    });
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
