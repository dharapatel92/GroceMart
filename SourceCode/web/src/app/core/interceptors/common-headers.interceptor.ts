import { HttpEvent, HttpHandler, HttpInterceptor, HttpParameterCodec, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CommonHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addHeaders(request));
  }

  addHeaders(request: HttpRequest<unknown>): any {
    const params = new HttpParams({
      encoder: new CustomHttpParamEncoder(),
      fromString: request.params.toString()
    });

    const addParams: boolean = false;

    if (!!addParams) {
      return request.clone({
        params,
        setHeaders: {
          // Header Values
        }
      });
    } else {
      return request.clone({
        params
      });
    }
  }
}

export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    key = key.trim();
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    value = value.trim();
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    key = key.trim();
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    value = value.trim();
    return decodeURIComponent(value);
  }
}
