import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { Debounce } from "../../core/decorators/debounce.decorator";
import { Product } from "../../core/interfaces/product.interface";
import { CartService } from "../../core/services/cart.service";
import { SharedModule } from "../../shared/shared.module";

export interface Cart {
  orderId: number;
  amount: number;
  totalqty: number;
  orderDetailsDTOList: Order[];
  userId: number;
  status: "In_CART";
}

type Order = { id: number; product: Product; quantity: number };

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [SharedModule, ProgressSpinnerModule],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent {
  products!: Cart | null;
  categoryId: number = 1;
  isLoading = false;

  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.isLoading = true;
    this.cartService.getCartItems().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res.data?.[0];
        this.isLoading = false;
        console.log("this.products: ", this.products);
      },
    });
  }

  navigateToProductsList() {
    this.router.navigate(["product"]);
    this.cartService.hideCart();
  }

  hideCart() {
    this.cartService.hideCart();
  }

  @Debounce(300)
  setQty(inputEvent: any, order: any) {
    const difference = inputEvent.value - order.quantity;

    this.cartService
      .setProductQuantity(order.product.id, inputEvent.value)
      .subscribe({
        next: (res: any) => {
          if (!res.data) {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail:
                "Cannot add more quantity. It is more than available stock.",
            });
            inputEvent.writeValue(inputEvent.value - difference);
            return;
          }
          const data = res.data as Cart;
          this.cartService.cartItemsCount$.next(data?.totalqty);
          this.products = data;
        },
        error: (err: any) => {
          console.log(err);
          inputEvent.writeValue(inputEvent.value - difference);
        },
      });
  }

  // increment(order: Order) {
  //   order.quantity++;
  //   this.cartService
  //     .setProductQuantity(order.product.id, 0)
  //     .subscribe((res: any) => {
  //       if (res) {
  //         this.setQty(order, order.quantity);
  //       }
  //     });
  // }

  // decrement(order: Order) {
  //   order.quantity--;
  //   this.cartService
  //     .setProductQuantity(order.product.id, 0)
  //     .subscribe((res: any) => {
  //       if (res) {
  //         this.setQty(order, order.quantity);
  //       }
  //     });
  // }

  removeItemFromCart(productId: number | undefined) {
    if (productId)
      this.cartService.setProductQuantity(productId, 0).subscribe({
        next: (res: any) => {
          const data = res.data as Cart;
          this.cartService.cartItemsCount$.next(data?.totalqty);
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
