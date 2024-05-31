import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res: any) => {
          if (res) {
            this.router.navigate(
              [
                "auth/reset-password",
                encodeURI(this.forgotPasswordForm.value.email),
              ],
              {}
            );
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
