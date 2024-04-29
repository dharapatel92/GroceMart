import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataInTableComponent } from './no-data-in-table.component';

describe('NoDataInTableComponent', () => {
  let component: NoDataInTableComponent;
  let fixture: ComponentFixture<NoDataInTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoDataInTableComponent]
    });
    fixture = TestBed.createComponent(NoDataInTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
