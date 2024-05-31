import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
})
export class ResetPasswordComponent {
  forgotPasswordForm!: FormGroup;
  email: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.email = params["email"];
    });
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      password: ["test@123", Validators.required],
      code: ["test@123", Validators.required],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const params = {
        email: this.email,
        ...this.forgotPasswordForm.value,
      };
      this.authService.resetPassword(params).subscribe({
        next: (res: any) => {
          if (res) {
            this.router.navigate(["auth/login"], {});
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
