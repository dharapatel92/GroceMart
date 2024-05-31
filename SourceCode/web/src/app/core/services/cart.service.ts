import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cart = new Map();
  private orderId!: number;
  private userId!: number;

  cartItemsCount$ = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) {
    const user = localStorage.getItem("user");
    if (user) {
      this.userId = JSON.parse(user)?.id;
      if (!this.userId) return;
    }

    // set user's Cart info
    this.getCartItems().subscribe((res: any) => {
      const data = res.data;
      this.orderId = data[0]?.orderId;
      const detail = data.filter((el: any) => el.status == "In_CART")?.[0];
      detail?.orderDetailsDTOList.forEach((productObj: any) => {
        this.cart.set(productObj?.product.id, productObj?.quantity);
      });
      this.cartItemsCount$.next(data.totalqty || 0);
    });
  }

  addToCart(productId: number) {
    this.cart.set(
      productId,
      this.cart.has(productId) ? this.cart.get(productId) + 1 : 1
    );
    return this.callAddToCartApi(productId);
  }

  private callAddToCartApi(productId: number) {
    const payload = {
      userId: this.userId,
      productId,
      qty: this.cart.get(productId),
    };
    return this.httpClient.post(`${environment.API_URL}V1/addToCart`, payload);
  }

  setOrderId(orderId: number) {
    if (!this.orderId) this.orderId = orderId;
  }

  getCartItems() {
    let params = new HttpParams()
      .set("status", "In_CART")
      .set("userId", this.userId);

    return this.httpClient.get(`${environment.API_URL}orders`, { params });
  }

  setProductQuantity(productId: number, quantity: number) {
    this.cart.set(productId, quantity);
    return this.callAddToCartApi(productId);
  }

  setCheckoutStatus() {
    let params = new HttpParams().set("status", "CHECK_OUT");
    return this.httpClient.put(
      `${environment.API_URL}update/order/${this.orderId}`,
      "",
      { params }
    );
  }

  emptyCart() {
    this.cart.clear();
  }
}
