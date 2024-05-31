import { Component } from "@angular/core";
import { Product } from "../../core/interfaces/product.interface";
import { ProductService } from "../../core/services/product.service";
import { SharedModule } from "../../shared/shared.module";
import { CartService } from "../../core/services/cart.service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";

interface Cart {
  orderId: number;
  amount: number;
  totalqty: number;
  orderDetailsDTOList: { id: number; product: Product; quantity: number }[];
  userId: number;
  status: "In_CART";
}

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent {
  products!: Cart | null;

  categoryId: number = 1;

  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.cartService.getCartItems().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res.data?.[0];
        console.log("this.products: ", this.products);
      },
    });
  }

  onCheckout() {
    this.cartService.setCheckoutStatus().subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartService.cartItemsCount$.next(0);
        this.cartService.emptyCart();
        this.products = null;
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: res?.data?.message || "Checkout done successfully",
        });
        this.router.navigate(["product", "checkout"]);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err?.message || "Checkout Failed",
        });
      },
    });
  }

  setQty(inputEvent: any, order: any) {
    console.log(inputEvent);
    console.log(order);
    this.cartService
      .setProductQuantity(order.product.id, inputEvent.value)
      .subscribe({
        next: (res: any) => {
          const data = res.data as Cart;
          this.cartService.cartItemsCount$.next(data.totalqty);
          this.products = data;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  removeItemFromCart(productId: number | undefined) {
    if (productId)
      this.cartService.setProductQuantity(productId, 0).subscribe({
        next: (res: any) => {
          const data = res.data as Cart;
          this.cartService.cartItemsCount$.next(data.totalqty);
          this.products = data;
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Product successfully removed from Cart",
          });
        },
        error: (err: any) => {
          console.log(err);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Error while Deleting Product From Cart",
          });
        },
      });
  }
}
