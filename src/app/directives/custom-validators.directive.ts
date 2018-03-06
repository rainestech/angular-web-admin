import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[appEqualVal]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EqualValDirective,
            multi: true
        }
    ]
})

export class EqualValDirective implements Validator {
  @Input() equalval: string;

  validate(control: AbstractControl): {[key: string]: any} {
    // Get self value.
    const val = control.value;
    // Get control value.
    const cValue = control.root.get(this.equalval);
    // value not equal
    if (cValue && val !== cValue.value) {
      return {
        equalval: false
      };
    }

    return null;
  }
}

export const CUSTOM_VALIDATORS = [
  EqualValDirective
];
