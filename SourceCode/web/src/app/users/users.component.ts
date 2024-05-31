import { Component } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";
import { SharedModule } from "../shared/shared.module";
import { LoaderService } from "../core/services/loader.service";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent {
  users: any[] = [];
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {
    loaderService.show();
    this.authService.getUsers().subscribe((users: any) => {
      loaderService.hide();
      this.users = users?.data || [];
    });
  }
}
