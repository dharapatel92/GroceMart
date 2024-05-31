import { Component } from "@angular/core";
import { CartService } from "../../core/services/cart.service";
import { Product } from "../../core/interfaces/product.interface";
import { SharedModule } from "../../shared/shared.module";
import { MessageService } from "primeng/api";
import { LoaderService } from "../../core/services/loader.service";

@Component({
  selector: "app-orders",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./orders.component.html",
  styleUrl: "./orders.component.scss",
})
export class OrdersComponent {
  orders!: any;
  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.loaderService.show();
    this.cartService.getAllOrders().subscribe({
      next: (res: any) => {
        console.log(res);
        this.loaderService.hide();
        this.orders = res.data;
      },
      error: (err) => {
        this.loaderService.hide();
        console.log(err);
      },
    });
  }

  getProductsInfo(products: any[]) {
    let productInfo = "";
    products.forEach((el, index) => {
      productInfo += `${el?.product?.productName} x ${el?.quantity}${
        index === products.length - 1 ? "" : ", "
      }`;
    });
    return productInfo;
  }

  setOrderStatusAsCompleted(orderId: number) {
    this.loaderService.show();
    this.cartService.setOrderStatus("COMPLETED", orderId).subscribe({
      next: (res) => {
        console.log(res);
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Order Id " + orderId + " status is updated to COMPLETED",
        });
        this.getAllOrders();
      },
      error: (err) => {
        console.log(err);
        this.loaderService.hide();
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Error occurred while updating Order's status",
        });
      },
    });
  }
}
