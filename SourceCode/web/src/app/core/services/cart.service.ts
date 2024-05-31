import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/services/auth.service";
export type orderStatus = "In_CART" | "CHECK_OUT" | "COMPLETED" | "CANCELLED";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cart = new Map();
  private orderId!: number;
  private userId!: number;

  cartItemsCount$ = new BehaviorSubject<number>(0);
  isSidebarCartVisible$ = new BehaviorSubject<boolean>(false);
  checkOutDetails!: any;
  paymentDetails!: any;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    if (
      !this.cart.size &&
      authService.isLoggedIn() &&
      authService.roleCheck("CUSTOMER")
    ) {
      setTimeout(() => {
        this.setCustomerCartInfo();
      }, 300);
    }
  }

  setCustomerCartInfo() {
    const user = localStorage.getItem("user");
    if (user) {
      this.userId = JSON.parse(user)?.id;
      if (!this.userId) return;
    }

    // set user's Cart info
    this.getCartItems().subscribe((res: any) => {
      const data = res.data[0];
      this.orderId = data?.orderId;
      // const detail = data.filter((el: any) => el.status == "In_CART")?.[0];
      data?.orderDetailsDTOList.forEach((productObj: any) => {
        this.cart.set(productObj?.product.id, productObj?.quantity);
      });
      this.cartItemsCount$.next(data?.totalqty || 0);
    });
  }

  addToCart(productId: number) {
    this.cart.set(
      productId,
      this.cart.has(productId) ? this.cart.get(productId) + 1 : 1
    );
    return this.callAddToCartApi(productId);
  }

  private callAddToCartApi(productId: number | undefined) {
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
      .set("userId", this.authService.getUserId());

    return this.httpClient.get(`${environment.API_URL}orders`, { params });
  }

  setProductQuantity(productId: number | undefined, quantity: number) {
    this.cart.set(productId, quantity);
    return this.callAddToCartApi(productId);
  }

  setOrderStatus(status: orderStatus, orderId?: number) {
    let params = new HttpParams().set("status", status);
    return this.httpClient.put(
      `${environment.API_URL}update/order/${orderId || this.orderId}`,
      "",
      { params }
    );
  }

  getAllOrders() {
    let params = new HttpParams().set("status", "CHECK_OUT");
    return this.httpClient.get(`${environment.API_URL}getAllOrders`, {
      params,
    });
  }

  checkOut() {
    const checkoutDetails = {
      ...this.checkOutDetails,
      ...this.paymentDetails,
    };
    console.log("checkoutDetails: ", checkoutDetails);
    if (!Object.keys(checkoutDetails).length) return;
    return this.httpClient.put(
      `${environment.API_URL}update/checkOut`,
      checkoutDetails
    );
  }

  emptyCart() {
    this.cart.clear();
  }

  showCart() {
    this.isSidebarCartVisible$.next(true);
  }

  hideCart() {
    this.isSidebarCartVisible$.next(false);
  }
}
