import { Component } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CartService } from "../../core/services/cart.service";
import { Cart } from "../../layout/cart/cart.component";
import { MessageService } from "primeng/api";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { cities } from "../cities.data";
import { Router } from "@angular/router";

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
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    address1: new FormControl("", Validators.required),
    address2: new FormControl("", Validators.required),
    postalCode: new FormControl("", Validators.required),
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

  get firstName() {
    return this.shippingAddressForm.get("firstName") as FormControl;
  }
  get lastName() {
    return this.shippingAddressForm.get("lastName") as FormControl;
  }
  get address1() {
    return this.shippingAddressForm.get("address1") as FormControl;
  }
  get address2() {
    return this.shippingAddressForm.get("address2") as FormControl;
  }
  get postalCode() {
    return this.shippingAddressForm.get("postalCode") as FormControl;
  }
  get city() {
    return this.shippingAddressForm.get("city") as FormControl;
  }

  setQty(inputEvent: any, order: any) {
    console.log(inputEvent);
    console.log(order);
    this.cartService
      .setProductQuantity(order.product.id, inputEvent.value)
      .subscribe({
        next: (res: any) => {
          if (!res.data) return;
          const data = res.data as Cart;
          this.cartService.cartItemsCount$.next(data?.totalqty);
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
    console.log("Valid");
    this.router.navigate(["product", "payment"]);
  }
}
