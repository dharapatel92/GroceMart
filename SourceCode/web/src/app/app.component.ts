import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { MessageService } from "primeng/api";
import { FooterComponent } from "./footer/footer.component";
import { SharedModule } from "./shared/shared.module";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SharedModule, NgxSpinnerModule, FooterComponent],
  providers: [MessageService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "groce-mart";
}
