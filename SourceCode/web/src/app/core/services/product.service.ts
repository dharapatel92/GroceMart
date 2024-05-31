import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Product } from "../interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  createProduct(params: Product) {
    const data = new FormData();

    data.append("userId", "1");
    data.append("imageFile", params?.image || "", params?.image.name);
    delete params?.image;
    // delete params?.description;
    // delete params?.isStock;

    params.price = +params.price;
    params.salePrice = +params.salePrice;

    data.append("productDTO", JSON.stringify(params));

    return this.httpClient.post(`${environment.API_URL}product/product`, data);
  }

  getProductListByCategory(catId: number) {
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
    data.append("imageFile", params?.image || "", params?.image.name);
    delete params?.image;
    // delete params?.description;
    // delete params?.isStock;

    params.price = +params.price;
    params.salePrice = +params.salePrice;

    data.append("productDTO", JSON.stringify(params));

    return this.httpClient.put(`${environment.API_URL}product/product`, data);
  }

  deleteProduct(productId: number) {
    const userId = JSON.parse(localStorage.getItem("user") || "")?.id;
    return this.httpClient.delete(
      `${environment.API_URL}product/product/${productId}/${userId}`
    );
  }
}
