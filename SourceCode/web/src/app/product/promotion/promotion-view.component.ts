import { Component } from "@angular/core";
import { ProductService } from "../../core/services/product.service";
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: "app-promotion",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./promotion-view.component.html",
  styleUrl: "./promotion-view.component.scss",
})
export class PromotionViewComponent {
  products!: any[];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductListByCategory().subscribe((res: any) => {
      const data = res?.data;
      console.log(data);
      this.products = data;
    });
  }
}
