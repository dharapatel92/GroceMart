import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input, p-inputNumber, p-calendar'
})
export class OnEnterNextElementDirective {
  @HostListener('keydown.Enter', ['$event'])
  handleBlur(event: any) {
    this.findNextFocusableElement(event.target);
  }

  findNextFocusableElement(currentElement: any) {
    const focusableElements =
      'a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    const focusable = Array.prototype.filter.call(document.querySelectorAll(focusableElements), function (element) {
      //check for visibility while always include the current activeElement
      return element.offsetWidth > 0 || element.offsetHeight > 0 || element === currentElement;
    });
    const index = focusable.indexOf(currentElement);
    if (index > -1) {
      const nextElement = focusable[index + 1] || focusable[0];
      nextElement.focus();
    }
  }
}

@Directive({
  selector: 'p-dropdown'
})
export class OnEnterDropdownNextElementDirective {
  constructor(private element: ElementRef) {}
  @HostListener('onHide', ['$event'])
  handleBlur(event: any) {
    this.findNextFocusableElement(this.element.nativeElement.querySelector('input[role="combobox"]'));
  }

  findNextFocusableElement(currentElement: any) {
    const focusableElements =
      'a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

    console.log(focusableElements);

    const focusable = Array.prototype.filter.call(document.querySelectorAll(focusableElements), function (element) {
      //check for visibility while always include the current activeElement
      return element.offsetWidth > 0 || element.offsetHeight > 0 || element === currentElement;
    });
    const index = focusable.indexOf(currentElement);
    // console.log(focusable);
    // console.log(index);

    if (index > -1) {
      const nextElement = focusable[index + 1] || focusable[0];
      // console.log(nextElement);

      nextElement.focus();
    }
  }
}
