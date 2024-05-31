import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";
import { SharedModule } from "../../shared/shared.module";
import { AppMenuitemComponent } from "./app.menuitem.component";

@Component({
  selector: "app-menu",
  templateUrl: "./app.menu.component.html",
  standalone: true,
  imports: [SharedModule, AppMenuitemComponent],
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log(this.authService.roleCheck("ADMIN"));

    this.model = [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-phone",
        routerLink: ["/dashboard"],
        visible:
          this.authService.roleCheck("ADMIN") ||
          this.authService.roleCheck("VENDOR"),
      },
      {
        label: "Product",
        icon: "pi pi-fw pi-wallet",
        routerLink: ["/product"],
        items: [
          {
            label: "Product List",
            icon: "pi pi-fw pi-list",
            routerLink: ["/product"],
          },
          // {
          //   label: "Product View",
          //   icon: "pi pi-fw pi-image",
          //   routerLink: ["/product/product-view"],
          // },
          {
            label: "New Product",
            icon: "pi pi-fw pi-plus",
            routerLink: ["/product/product-new"],
            visible:
              this.authService.roleCheck("ADMIN") ||
              this.authService.roleCheck("VENDOR"),
          },
          {
            label: "Manage Promotion",
            icon: "pi pi-fw pi-money-bill",
            routerLink: ["/product/promotion-view"],
            visible:
              this.authService.roleCheck("ADMIN") ||
              this.authService.roleCheck("VENDOR"),
          },
          // {
          //   label: "Checkout Form",
          //   icon: "pi pi-fw pi-check-square",
          //   routerLink: ["/product/checkout"],
          // },
          // {
          //   label: "Order History",
          //   icon: "pi pi-fw pi-history",
          //   routerLink: ["/product/order-history"],
          // },
          // {
          //   label: "Order Summary",
          //   icon: "pi pi-fw pi-file",
          //   routerLink: ["/product/order-summary"],
          // },
        ],
      },
      {
        label: "Categories",
        icon: "pi pi-fw pi-wallet",
        items: [
          {
            label: "Category List",
            icon: "pi pi-fw pi-list",
            routerLink: ["/categories"],
          },
        ],
        visible: this.authService.roleCheck("ADMIN"),
      },
      {
        label: "Orders",
        icon: "pi pi-fw pi-cog",
        items: [
          {
            label: "View Orders",
            icon: "pi pi-fw pi-list",
            routerLink: ["/orders"],
          },
        ],
        visible:
          this.authService.roleCheck("ADMIN") ||
          this.authService.roleCheck("VENDOR"),
      },
      {
        label: "Users",
        icon: "pi pi-fw pi-users",
        routerLink: ["/users"],
        visible: this.authService.roleCheck("ADMIN"),
      },
      {
        label: "About Us",
        icon: "pi pi-fw pi-user",
        routerLink: ["/about-us"],
      },
      {
        label: "Contact Us",
        icon: "pi pi-fw pi-phone",
        routerLink: ["/contact-us"],
      },
    ];
  }
}
