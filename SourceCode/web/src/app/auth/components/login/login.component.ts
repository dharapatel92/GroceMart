import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { AuthService } from "../../services/auth.service";
import { LoaderService } from "../../../core/services/loader.service";
import { SelectButtonModule } from "primeng/selectbutton";
import { MessageService } from "primeng/api";
import { CartService } from "../../../core/services/cart.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [SharedModule, SelectButtonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  signInForm!: FormGroup;

  loginRolesOptions = [
    { label: "Customer", value: "CUSTOMER" },
    { label: "Vendor", value: "VENDOR" },
    { label: "Admin", value: "ADMIN" },
  ];
  activeRole = "CUSTOMER";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.loaderService.show();
      this.authService
        .login({ ...this.signInForm.value, role: this.activeRole })
        .subscribe({
          next: (res: any) => {
            this.loaderService.hide();
            if (res) {
              if (!res.data) {
                this.messageService.add({
                  severity: "error",
                  summary: "Error",
                  detail: res.message || "Login Failed",
                });
                return;
              }

              localStorage.setItem("user", JSON.stringify(res.data));
              if (res.data?.roles?.[0] === "CUSTOMER") {
                this.cartService.setCustomerCartInfo();
                this.router.navigate(["/product"]);
              } else {
                this.router.navigate(["/dashboard"]);
              }

              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Login Successful",
              });
            }
          },
          error: (err) => {
            this.loaderService.hide();
            console.log(err);
          },
        });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
