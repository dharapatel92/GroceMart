import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HasValue } from '../functions/has-value.function';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  readonly hasValue = HasValue;

  private dateFormat: BehaviorSubject<string> = new BehaviorSubject<string>('yy-mm-dd');
  dateFormat$: Observable<string> = this.dateFormat.asObservable();

  private inputLang: BehaviorSubject<string> = new BehaviorSubject<string>('');
  inputLang$: Observable<string> = this.inputLang.asObservable();

  constructor() {}

  setDateFormat(dateFormat: string) {
    this.dateFormat.next(dateFormat);
  }

  setInputLang(inputLang: string) {
    this.inputLang.next(inputLang);
  }
}
