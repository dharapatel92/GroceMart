import { Component } from "@angular/core";
import { LayoutService } from "../core/services/app.layout.service";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "app-contact-us",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./contact-us.component.html",
  styleUrl: "./contact-us.component.scss",
})
export class ContactUsComponent {
  options: any;

  overlays: any[] = [];

  dialogVisible: boolean = false;

  markerTitle: string = "";

  selectedPosition: any;

  infoWindow: any;

  draggable: boolean = false;

  name: string = "";

  email: string = "";

  message: string = "";

  content: any[] = [
    { icon: "pi pi-fw pi-phone", title: "Phone", info: "+61 (000) 000-0000" },
    {
      icon: "pi pi-fw pi-map-marker",
      title: "Our Head Office",
      info: "Address to be added",
    },
    { icon: "pi pi-fw pi-print", title: "Fax", info: "+61 (000) 000-0000" },
  ];

  constructor(private layoutService: LayoutService) {}

  get mapStyle() {
    return {
      "background-image":
        this.layoutService.config().colorScheme === "light"
          ? "url('assets/demo/images/contact/map-light.svg')"
          : "url('assets/demo/images/contact/map-dark.svg')",
    };
  }
}
