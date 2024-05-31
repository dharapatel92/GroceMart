import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../core/services/product.service";
import { SharedModule } from "../../shared/shared.module";
import { CartService } from "../../core/services/cart.service";
import { Cart } from "../../layout/cart/cart.component";

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

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params["id"];
      this.productService.getProductById(this.id).subscribe({
        next: (success: any) => {
          console.log(success);
          this.product = success?.data;
          console.log("this.product: ", this.product);

          this.cartService.getCartItems().subscribe((res: any) => {
            console.log(res);
            const data = res?.data;
            if (!data) return;
            const prod = data[0]?.orderDetailsDTOList.find(
              (el: any) => el.product.id === this.id
            );
            console.log("prod: ", prod);
            this.product.quantity = prod?.quantity;
          });
        },
      });
    });
  }

  setQty() {
    console.log(this.product);
    this.cartService
      .setProductQuantity(this.product.id, this.product.quantity)
      .subscribe({
        next: (res: any) => {
          if (!res.data) return;
          const data = res.data as Cart;
          this.cartService.cartItemsCount$.next(data?.totalqty);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
}
