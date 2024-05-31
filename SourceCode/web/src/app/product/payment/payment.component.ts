import { Component } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { MessageService } from "primeng/api";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CartService } from "../../core/services/cart.service";

@Component({
  selector: "app-payment",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.scss",
})
export class PaymentComponent {
  paymentForm = new FormGroup({
    cardHolderName: new FormControl("", Validators.required),
    cardNumber: new FormControl("", [
      Validators.required,
      Validators.maxLength(16),
      Validators.pattern("[0-9]{16}"),
    ]),
    expiryDate: new FormControl("", [
      Validators.required,
      Validators.pattern("(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})"),
    ]),
    cvv: new FormControl("", [
      Validators.required,
      Validators.maxLength(3),
      Validators.pattern("[0-9]{3}"),
    ]),
  });

  get cardHolderName() {
    return this.paymentForm.get("cardHolderName") as FormControl;
  }
  get cardNumber() {
    return this.paymentForm.get("cardNumber") as FormControl;
  }
  get expiryDate() {
    return this.paymentForm.get("expiryDate") as FormControl;
  }
  get cvv() {
    return this.paymentForm.get("cvv") as FormControl;
  }

  constructor(
    private messageService: MessageService,
    private router: Router,
    private cartService: CartService
  ) {}

  checkoutOnPaymentDone() {
    this.cartService.setOrderStatus("CHECK_OUT").subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartService.cartItemsCount$.next(0);
        this.cartService.emptyCart();
        this.router.navigate(["/"]);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Order placed successfully",
        });
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

  submitPayment() {
    if (this.paymentForm.valid) {
      this.checkoutOnPaymentDone();
    } else {
      this.paymentForm.markAllAsTouched();
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Form is invalid. Please check the fields",
      });
    }
  }
}
