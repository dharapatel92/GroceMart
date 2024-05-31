import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/services/auth.service";
import { Product } from "../interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  private products!: any[];
  searchedProducts$ = new Subject<any[]>();

  createProduct(params: Product) {
    const data = new FormData();

    data.append("userId", "1");
    data.append("imageFile", params?.image || "", params?.image?.name || "");
    delete params?.image;
    // delete params?.description;
    // delete params?.isStock;

    params.price = +params.price;
    params.salePrice = +params.salePrice;
    params.qty = +params.qty;

    data.append("productDTO", JSON.stringify(params));

    return this.httpClient.post(`${environment.API_URL}product/product`, data);
  }

  getProductListByCategory(catId?: number) {
    if (!catId) {
      return this.httpClient.get(
        `${environment.API_URL}product/productbyCategory`
      );
    }
    return this.httpClient.get(
      `${environment.API_URL}product/productbyCategory`,
      { params: { catId } }
    );
  }

  getProductById(productId: number) {
    return this.httpClient.get(`${environment.API_URL}product/product`, {
      params: { productId },
    });
  }

  getCategoryList() {
    return this.httpClient.get(`${environment.API_URL}product/AllCategory`);
  }

  createCategory(params: any) {
    return this.httpClient.post(
      `${environment.API_URL}product/product`,
      params
    );
  }

  updateProduct(params: Product) {
    const data = new FormData();

    data.append("userId", "1");
    data.append("imageFile", params?.image || "");
    delete params?.image;
    // delete params?.description;
    // delete params?.isStock;

    params.price = +params.price;
    params.salePrice = +params.salePrice;
    params.qty = +params.qty;

    data.append("productDTO", JSON.stringify(params));

    return this.httpClient.put(`${environment.API_URL}product/product`, data);
  }

  deleteProduct(productId: number) {
    let userData;
    try {
      userData = JSON.parse(localStorage.getItem("user") || "");
    } catch (error) {}
    const userId = userData?.id;
    return this.httpClient.delete(
      `${environment.API_URL}product/product/${productId}/${userId}`
    );
  }

  setProducts(products: any[]) {
    this.products = products;
  }

  getProducts() {
    return this.products;
  }

  searchProducts(searchItem: string) {
    const searchedProducts = searchItem
      ? this.products.filter((product) =>
          product.productName.toLowerCase().includes(searchItem.toLowerCase())
        )
      : this.products;
    this.searchedProducts$.next(searchedProducts);
  }

  addPromotionToProduct(productId: number, disPercentage: number) {
    const payload = {
      userId: this.authService.getUserId(),
      disPercentage: +disPercentage,
      productId: +productId,
    };
    return this.httpClient.post(
      `${environment.API_URL}product/promotion`,
      payload
    );
  }
}
