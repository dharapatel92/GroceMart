import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "../auth/services/auth.service";
import { LoaderService } from "../core/services/loader.service";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
  profileForm!: FormGroup;
  userId!: number;
  userData!: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      email: [{ value: "", disabled: true }],
      password: [{ value: "", disabled: true }],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      contact: ["", Validators.required],
    });

    this.userId = this.authService.getUserId();

    this.loaderService.show();
    this.authService.getUser(this.userId).subscribe({
      next: (res: any) => {
        this.loaderService.hide();
        this.userData = res?.data;
        this.profileForm.patchValue(this.userData);
      },
      error: (err) => {
        this.loaderService.hide();
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const params = this.profileForm.getRawValue();
    params.id = this.userId;
    params.roles = this.userData.roles;
    console.log(params);

    this.loaderService.show();
    this.authService.updateUser(params).subscribe({
      next: (res: any) => {
        this.loaderService.hide();
        if (res) {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "User Profile updated successfully",
          });
        }
      },
      error: (err) => {
        this.loaderService.hide();
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Error occurred while updating User Profile",
        });
        console.log(err);
      },
    });
  }
}
