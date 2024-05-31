import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { LoaderService } from "../../core/services/loader.service";
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: "app-add-users",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./add-users.component.html",
  styleUrl: "./add-users.component.scss",
})
export class AddUsersComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      contact: ["", Validators.required],
      roles: ["", Validators.required],
    });

    const userId = this.route.snapshot.params["userId"];
    if (userId) {
      this.loaderService.show();
      this.authService.getUser(userId).subscribe({
        next: (res: any) => {
          this.loaderService.hide();
          this.registerForm.patchValue({
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
    if (this.registerForm.valid) {
      const params = this.registerForm.value;
      params.roles = [this.registerForm.value.roles];
      console.log(params);
      this.loaderService.show();

      const userId = this.route.snapshot.params["userId"];
      if (userId) {
        params.id = +userId;
        this.authService.updateUser(params).subscribe({
          next: (res: any) => {
            this.loaderService.hide();
            if (res) {
              this.router.navigate(["/auth/login"]);
              // this.messageService.add({
              //   severity: "success",
              //   summary: "Success",
              //   detail: "Message Content",
              // });
            }
          },
          error: (err) => {
            this.loaderService.hide;
            console.log(err);
          },
        });
      } else {
        this.authService.register(params).subscribe({
          next: (res: any) => {
            this.loaderService.hide();
            if (res) {
              this.router.navigate(["/auth/login"]);
              // this.messageService.add({
              //   severity: "success",
              //   summary: "Success",
              //   detail: "Message Content",
              // });
            }
          },
          error: (err) => {
            this.loaderService.hide;
            console.log(err);
          },
        });
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
