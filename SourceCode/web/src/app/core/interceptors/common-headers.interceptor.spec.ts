import { TestBed } from '@angular/core/testing';

import { CommonHeadersInterceptor } from './common-headers.interceptor';

describe('CommonHeadersInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [CommonHeadersInterceptor]
    })
  );

  it('should be created', () => {
    const interceptor: CommonHeadersInterceptor = TestBed.inject(CommonHeadersInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
