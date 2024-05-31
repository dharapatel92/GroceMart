import { Component } from "@angular/core";
import { ProductService } from "../../core/services/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { MessageService } from "primeng/api";
import { LoaderService } from "../../core/services/loader.service";

@Component({
  selector: "app-update-promotion",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./update-promotion.component.html",
  styleUrl: "./update-promotion.component.scss",
})
export class UpdatePromotionComponent {
  productId!: number;
  product = new FormGroup({
    productName: new FormControl({ value: "", disabled: true }),
    disPercentage: new FormControl(0, Validators.required),
  });
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params["id"];
    if (this.productId) {
      this.productService
        .getProductById(this.productId)
        .subscribe((res: any) => {
          this.product.patchValue(res.data);
        });
    }
  }

  onSubmit() {
    if (this.product.invalid) {
      this.product.markAllAsTouched();
      return;
    }

    this.loaderService.show();
    const productValue = this.product.getRawValue();
    this.productService
      .addPromotionToProduct(this.productId, productValue.disPercentage || 0)
      .subscribe({
        next: (res) => {
          if (res) {
            this.loaderService.hide();
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Promotion applied successfully",
            });
            this.router.navigate(["product", "promotion-view"]);
          }
        },
        error: (err) => {
          this.loaderService.hide();
          console.log(err);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Error occurred while applying Promotion",
          });
        },
      });
  }
}
