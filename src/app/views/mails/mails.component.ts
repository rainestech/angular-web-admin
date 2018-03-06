import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailService, Mail } from './mail.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.scss']
})
export class MailsComponent implements OnInit {
  mails: any;
  mail: Mail;
  meta: any;
  curMailId = 0;
  curMail: any;
  links: any = {
    'next': null,
    'prev': null,
    'first': null,
    'last': null
  };
  reply = false;
  checked = false;
  checks = [];
  error: any;
  listToolBar = true;
  public fOptions: Object = {
    placeholder: 'your reply message here...',
    charCounterCount: true,
  };
  editorContent = '';
  constructor(
    private route: ActivatedRoute,
    private service: MailService,
  ) { }

  ngOnInit() {
    this.getMails();
  }

  getMails(link: string = null) {
    this.service.getMails(link).subscribe((data: any) => {
      this.mails = data.data;
      this.links = data.links;
      this.meta = data.meta;
    });
  }

  // private replyMail(mail: Mail) {
  //   const link = 'http://web.dev/api/mails/reply';
  //   this.http.post(link, JSON.stringify(mail))
  //   .subscribe(
  //     data => {
  //       this.mails = data.data;
  //       this.links = data.links;
  //       this.meta = data.meta;
  //       // console.log( data.links );
  //     },
  //     (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         // A client-side or network error occurred. Handle it accordingly.
  //         console.log('An error occurred:', err.error.message);
  //       } else {
  //         // The backend returned an unsuccessful response code.
  //         // The response body may contain clues as to what went wrong,
  //         console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
  //       }
  //     }
  //   );
  // }

  private resetVars () {
    this.checked = false;
    this.checks = [];
    this.listToolBar = true;
    this.reply = false;
  }

  readMsg(id) {
    const msg = this.mails.find(x => x.id === id);
    this.curMail = msg;
    this.curMailId = msg.id;
    this.listToolBar = false;
    // console.log(msg);
  }

  msgReply(id) {
    this.mail.reply = +id;
    this.mail.html = this.editorContent;
    this.mail.subject = 'Re: ' + this.curMail.subject;
    this.mail.recipient = this.curMail.sender;
    this.mail.sender = this.curMail.recipient;
  }

  inbox() {
    if (!this.mails) {
      this.getMails();
    }
    this.listToolBar = true;
    this.curMailId = 0;
    this.curMail = '';
  }

  starred() {

  }

  important() {

  }

  star(id = null) {
    this.service.ping().subscribe((data: any) => {
      alert(data);
    });
  }

  read(id = null) {

  }

  unStar(id = null) {

  }

  spam(id = null) {

  }

  sent() {

  }

  trash(id = null) {

  }

  navList(link) {
    this.checked = false;
    this.checks = [];
    this.getMails(link);
  }

  log() {
    console.log(this.editorContent);
    console.log(this.checks);
  }

  listCheck(e, id) {
     console.log(e.target.checked);
    if (e.target.checked) {
      this.checks.push(id);
    } else {
      const index = this.checks.indexOf(id);

      if (index > -1) {
        this.checks.splice(index, 1);
      }
    }
  }

  checkAll() {
    if (this.checked) {
      this.checked = false;
      this.checks = [];
    } else {
      this.checked = true;
      for (const mail of this.mails) {
        this.checks.push(mail.id);
      }
    }
  }
}
