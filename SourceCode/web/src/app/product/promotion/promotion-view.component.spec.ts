import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PromotionViewComponent } from "./promotion-view.component";

describe("PromotionComponent", () => {
  let component: PromotionViewComponent;
  let fixture: ComponentFixture<PromotionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
