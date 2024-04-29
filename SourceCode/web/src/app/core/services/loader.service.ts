import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loader$: Observable<boolean> = this.loader.asObservable();

  constructor() {}

  show() {}

  hide() {}
}
