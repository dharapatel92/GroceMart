import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { LoaderService } from "../../core/services/loader.service";
import { SharedModule } from "../../shared/shared.module";
import { MessageService } from "primeng/api";
import { AdminService } from "../../core/services/admin.service";

@Component({
  selector: "app-add-users",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./add-users.component.html",
  styleUrl: "./add-users.component.scss",
})
export class AddUsersComponent {
  userProfileForm!: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userProfileForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [""],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      contact: ["", Validators.required],
      roles: ["", Validators.required],
      active: [false, Validators.required],
      delete: [false, Validators.required],
    });

    this.userId = this.route.snapshot.params["userId"];
    console.log(this.userId);
    if (this.userId) {
      this.loaderService.show();
      this.authService.getUser(this.userId).subscribe({
        next: (res: any) => {
          this.loaderService.hide();
          console.log("res: ", res);
          this.userProfileForm.patchValue({
            ...res.data,
            roles: res.data.roles[0],
          });
        },
        error: (err) => {
          this.loaderService.hide();
          console.log(err);
        },
      });
    }
  }

  onSubmit() {
    if (!this.userProfileForm.valid) {
      this.userProfileForm.markAllAsTouched();
      return;
    }
    const params = this.userProfileForm.value;
    params.roles = [this.userProfileForm.value.roles];
    params.id = +this.userId;

    if (this.userId) {
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
            this.router.navigate(["users"]);
          }
        },
        error: (err) => {
          this.loaderService.hide;
          console.log(err);
        },
      });

      if (params.roles[0] === "VENDOR" && params.active) {
        this.adminService.updateVendorStatus(params.id).subscribe();
      }
    }
  }
}
