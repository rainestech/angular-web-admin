import { ErrorHandler, Injectable } from '@angular/core';

@Injectable ()
export class MyErrorHandler extends ErrorHandler {
  constructor () {
    super ();
  }

  handleError (error) {
    super.handleError (error);
    alert (`Error Occurred:${error}` );
  }
}
