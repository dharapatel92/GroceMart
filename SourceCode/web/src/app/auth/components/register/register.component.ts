import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { AuthService } from "../../services/auth.service";
import { LoaderService } from "../../../core/services/loader.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [
        "test_customer@mailinator.com",
        [Validators.required, Validators.email],
      ],
      password: ["test@123", Validators.required],
      firstName: ["ABC", Validators.required],
      lastName: ["PQR", Validators.required],
      contact: ["1234567890", Validators.required],
      roles: ["CUSTOMER", Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loaderService.show();
      const params = this.registerForm.value;
      params.roles = [this.registerForm.value.roles];
      this.authService.register(params).subscribe({
        next: (res: any) => {
          this.loaderService.hide();
          if (res) {
            if (!res.data) {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: res?.message,
              });
              return;
            }
            this.router.navigate(["/auth/login"]);
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: res?.message,
            });
          }
        },
        error: (err) => {
          this.loaderService.hide();
          console.log(err);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
