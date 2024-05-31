import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CartService } from "../../core/services/cart.service";
import { Cart } from "../../layout/cart/cart.component";
import { SharedModule } from "../../shared/shared.module";
import { cities } from "../cities.data";
import { Debounce } from "../../core/decorators/debounce.decorator";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent {
  promoCode: string = "";
  cities = cities;
  selectedCity: string = "";
  products!: Cart;

  shippingAddressForm = new FormGroup({
    getfName: new FormControl("", Validators.required),
    getlName: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    address1: new FormControl("", Validators.required),
    code: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
  });

  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router
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

  get getfName() {
    return this.shippingAddressForm.get("getfName") as FormControl;
  }
  get getlName() {
    return this.shippingAddressForm.get("getlName") as FormControl;
  }
  get address() {
    return this.shippingAddressForm.get("address") as FormControl;
  }
  get address1() {
    return this.shippingAddressForm.get("address1") as FormControl;
  }
  get code() {
    return this.shippingAddressForm.get("code") as FormControl;
  }
  get city() {
    return this.shippingAddressForm.get("city") as FormControl;
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

  onSubmit() {
    if (this.shippingAddressForm.invalid) {
      this.shippingAddressForm.markAllAsTouched();
      return;
    }
    this.cartService.checkOutDetails = {
      ...this.shippingAddressForm.value,
      city: (this.shippingAddressForm.value?.city as any)?.name,
      orderId: this.products.orderId,
    };
    this.router.navigate(["product", "payment"]);
  }
}
