import { Component } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";
import { Product } from "../../core/interfaces/product.interface";
import { CartService } from "../../core/services/cart.service";
import { LoaderService } from "../../core/services/loader.service";
import { ProductService } from "../../core/services/product.service";
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.scss",
})
export class ProductListComponent {
  products: Product[] = [];
  categoryList: any[] = [];
  categoryId: number | undefined = 1;

  constructor(
    private productService: ProductService,
    public authService: AuthService,
    private loaderService: LoaderService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getCategoryList().subscribe({
      next: (success: any) => {
        console.log(success);
        this.categoryList = [
          { id: undefined, categoryName: "ALL", active: true },
          ...success.data,
        ];
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getProductList();
    this.getSearchedProducts();
  }

  getProductList() {
    this.loaderService.show();
    this.productService.getProductListByCategory(this.categoryId).subscribe({
      next: (success: any) => {
        this.loaderService.hide();
        console.log(success);
        this.products = success.data;
        this.productService.setProducts(this.products);
      },
      error: (err) => {
        this.loaderService.hide();
        console.log(err);
      },
    });
  }

  getSearchedProducts() {
    this.loaderService.show();
    this.productService.searchedProducts$.subscribe({
      next: (products: any) => {
        this.loaderService.hide();
        this.products = products;
      },
      error: (err) => {
        this.loaderService.hide();
        console.log(err);
      },
    });
  }

  addToCart(productId: number | undefined) {
    if (productId)
      this.cartService.addToCart(productId).subscribe((res: any) => {
        if (res) {
          this.cartService.cartItemsCount$.next(res.data?.totalqty);
          this.cartService.showCart();
          this.cartService.setOrderId(res.data?.orderId);
        }
      });
  }

  // for Admin/Vendor
  deleteProduct(productId: any) {
    this.loaderService.show();
    this.productService.deleteProduct(productId).subscribe({
      next: (res: any) => {
        this.loaderService.hide();
        this.getProductList();
      },
      error: (err) => {
        this.loaderService.hide();
        console.log(err);
      },
    });
  }
}
