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
    cardNo: new FormControl("", [
      Validators.required,
      Validators.maxLength(16),
      Validators.pattern("[0-9]{16}"),
    ]),
    cardExp: new FormControl("", [
      Validators.required,
      Validators.pattern("(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})"),
    ]),
    cardCVV: new FormControl("", [
      Validators.required,
      Validators.maxLength(3),
      Validators.pattern("[0-9]{3}"),
    ]),
  });

  get cardHolderName() {
    return this.paymentForm.get("cardHolderName") as FormControl;
  }
  get cardNo() {
    return this.paymentForm.get("cardNo") as FormControl;
  }
  get cardExp() {
    return this.paymentForm.get("cardExp") as FormControl;
  }
  get cardCVV() {
    return this.paymentForm.get("cardCVV") as FormControl;
  }

  constructor(
    private messageService: MessageService,
    private router: Router,
    private cartService: CartService
  ) {}

  checkoutOnPaymentDone() {
    this.cartService.checkOut()?.subscribe({
      next: () => {
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
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  submitPayment() {
    if (this.paymentForm.valid) {
      this.cartService.paymentDetails = this.paymentForm.value;
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
