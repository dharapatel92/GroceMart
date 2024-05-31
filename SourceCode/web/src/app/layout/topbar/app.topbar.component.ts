import { Component, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";
import { LayoutService } from "../../core/services/app.layout.service";
import { SharedModule } from "../../shared/shared.module";
import { AppSidebarComponent } from "../sidebar/app.sidebar.component";
import { SidebarModule } from "primeng/sidebar";
import { CartComponent } from "../cart/cart.component";
import { CartService } from "../../core/services/cart.service";
import { FormControl } from "@angular/forms";
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs";
import { ProductService } from "../../core/services/product.service";

@Component({
  selector: "app-topbar",
  templateUrl: "./app.topbar.component.html",
  styleUrl: "./app.topbar.component.scss",
  standalone: true,
  imports: [SharedModule, AppSidebarComponent, SidebarModule, CartComponent],
})
export class AppTopbarComponent {
  @ViewChild("menubutton") menuButton!: ElementRef;
  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
  activeItem!: number;
  isLoggedIn: boolean = false;
  isSidebarCartVisible: boolean = false;
  itemsCount = 0;
  searchControl = new FormControl("");

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    public el: ElementRef,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchItem) => {
        console.log(searchItem);
        productService.searchProducts(searchItem || "");
      });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.cartService.cartItemsCount$.subscribe(
      (count) => (this.itemsCount = count)
    );
    this.cartService.isSidebarCartVisible$.subscribe((val) => {
      this.isSidebarCartVisible = val;
    });
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onSidebarButtonClick() {
    this.layoutService.showSidebar();
  }

  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }

  logout() {
    this.authService.logout();
  }
}
