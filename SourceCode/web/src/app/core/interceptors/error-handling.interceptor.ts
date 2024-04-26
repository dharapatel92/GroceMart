import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, mergeMap, of, retryWhen, throwError, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { DesignService } from '../services/design.service';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  retryDelay = 3000;
  retryMaxAttempts = 3;

  constructor(
    private router: Router,
    private ds: DesignService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(this.retryAfterDelay(), this.errorHandling());
  }

  errorHandling(): any {
    return catchError((error: HttpErrorResponse) => {
      try {
        switch (error.status) {
          case 0:
            this.ds.showError({ error: { message: `${error.statusText} maybe Internet Issue` } });
            break;

          case 401:
          case 403:
          case 404:
          case 405:
          case 408:
            this.navigateWithError(`/error/${error.status}`, error);
            break;

          case 422:
            this.ds.showError(error);
            break;

          case 500:
            this.ds.showError('Internal Server Error. Please contact Admin');
            break;
        }
      } catch (e) {}

      return throwError(error);
    });
  }

  retryAfterDelay(): any {
    return retryWhen<HttpEvent<unknown>>((errors) => {
      return errors.pipe(
        mergeMap((err, count) => {
          // throw error when we've retried ${retryMaxAttempts} number of times and still get an error
          if (this.skipRetry(err) || count === this.retryMaxAttempts) {
            return throwError(err);
          }

          return of(err).pipe(mergeMap(() => timer(this.retryDelay)));
        }),
        take(this.retryMaxAttempts + 1)
      );
    });
  }

  private navigateWithError(url: string, error: HttpErrorResponse): void {
    this.router.navigate([url], { queryParams: { error: JSON.stringify(error) } });
  }

  private skipRetry(error: HttpErrorResponse): boolean {
    return [500, 408, 422].includes(error.status);
  }
}
