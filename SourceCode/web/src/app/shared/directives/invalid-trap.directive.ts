import { Directive, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInvalidTrap]'
})
export class InvalidTrapDirective {
  constructor(@Optional() public control: NgControl) {}

  @HostListener('blur', ['$event'])
  handleBlur(event: any) {
    if (this.control.invalid) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      event?.target?.focus();
    }
  }
}
