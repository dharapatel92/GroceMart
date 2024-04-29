import { Directive } from '@angular/core';
import Inputmask from 'inputmask';
import { Calendar } from 'primeng/calendar';
import { Subscription } from 'rxjs';
import { PublicService } from '../../core/services/public.service';

@Directive({
  selector: '[appDateFormat]'
})
export class DateFormatDirective {
  format?: string;
  dateFormat$?: Subscription;

  constructor(
    private calender: Calendar,
    private ps: PublicService
  ) {
    this.calender.appendTo = 'body';
    this.calender.showClear = true;
  }

  ngOnInit() {
    this.dateFormat$ = this.ps.dateFormat$.subscribe((format) => {
      this.format = format;
      this.calender.dateFormat = format;
      this.ngAfterViewInit();
      this.calender.updateInputfield();
    });
  }

  ngAfterViewInit() {
    const input: HTMLInputElement = this.calender.el.nativeElement.querySelector('input');
    if (input) {
      new Inputmask(this.getDateMask()).mask(input);
    }
  }

  getDateMask(): string {
    let mask = '';

    switch (this.format) {
      case 'dd-mm-yy':
        mask = '99-99-9999';
        break;

      case 'yy-mm-dd':
        mask = '9999-99-99';
        break;

      default:
        mask = '99-99-9999';
        break;
    }

    if (this.calender.timeOnly) {
      return '99:99';
    } else if (this.calender.showTime) {
      return `${mask} 99:99`;
    } else {
      return mask;
    }
  }

  ngOnDestroy() {
    this.dateFormat$?.unsubscribe();
  }
}
