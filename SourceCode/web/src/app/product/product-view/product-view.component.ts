import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../core/services/product.service";
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: "app-product-view",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./product-view.component.html",
  styleUrl: "./product-view.component.scss",
})
export class ProductViewComponent {
  id: number = 0;
  product: any = {};
  color: string = "bluegray";

  size: string = "M";

  liked: boolean = false;

  images: string[] = [];

  selectedImageIndex: number = 0;

  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
      this.productService.getProductById(this.id).subscribe({
        next: (success: any) => {
          console.log(success);

          this.product = success?.data;
        },
      });
    });
  }
}
