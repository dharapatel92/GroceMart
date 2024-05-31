import { Component } from "@angular/core";
import { LayoutService } from "../../core/services/app.layout.service";
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: "app-profilemenu",
  templateUrl: "./app.profilesidebar.component.html",
  standalone: true,
  imports: [SharedModule],
})
export class AppProfileSidebarComponent {
  constructor(public layoutService: LayoutService) {}

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }
}
