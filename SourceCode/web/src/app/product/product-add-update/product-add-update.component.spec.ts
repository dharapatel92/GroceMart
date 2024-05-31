import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddUpdateComponent } from './product-add-update.component';

describe('ProductAddUpdateComponent', () => {
  let component: ProductAddUpdateComponent;
  let fixture: ComponentFixture<ProductAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
