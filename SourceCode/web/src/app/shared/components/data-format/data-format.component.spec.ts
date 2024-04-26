import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormatComponent } from './data-format.component';

describe('DataFormatComponent', () => {
  let component: DataFormatComponent;
  let fixture: ComponentFixture<DataFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFormatComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DataFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
