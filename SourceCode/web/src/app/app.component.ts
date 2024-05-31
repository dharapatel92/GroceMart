import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SharedModule, NgxSpinnerModule],
  providers: [MessageService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "groce-mart";
}
