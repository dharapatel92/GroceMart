import { Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../../core/interfaces/product.interface";
import { ProductService } from "../../core/services/product.service";
import { SharedModule } from "../../shared/shared.module";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "../../core/services/loader.service";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-product-add-update",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./product-add-update.component.html",
  styleUrl: "./product-add-update.component.scss",
})
export class ProductAddUpdateComponent {
  @ViewChildren("buttonEl") buttonEl!: QueryList<ElementRef>;

  categoryOptions = [];

  colorOptions: any[] = [
    { name: "Black", background: "bg-gray-900" },
    { name: "Orange", background: "bg-orange-500" },
    { name: "Navy", background: "bg-blue-500" },
  ];

  productId!: number;

  product: Product = {
    productName: "Product Name",
    price: 10,
    salePrice: 11,
    productCode: "Test",
    qty: 1,
    categoryId: 1,
    description: "Product Description",
    isStock: false,
    isActive: false,
    isDelete: false,
  };

  uploadedFiles: any[] = [];

  showRemove: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {
    this.productService.getCategoryList().subscribe({
      next: (success: any) => {
        console.log(success);
        this.categoryOptions = success.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.params["id"];
    if (this.productId) {
      this.loaderService.show();
      this.productService.getProductById(this.productId).subscribe({
        next: (res: any) => {
          this.loaderService.hide();
          console.log("res: ", res);
          const productData: Product = res.data;
          this.product = productData;
          this.getConvertedImageUrlToFile(this.product.image);
        },
        error: (err) => {
          this.loaderService.hide();
          console.log(err);
        },
      });
    }
  }

  onUpload(event: any) {
    console.log(event);

    if (event?.files?.[0]) {
      this.product.image = event?.files?.[0];
    }
  }

  getConvertedImageUrlToFile(imageUrl: string) {
    this.httpClient
      .get(imageUrl, { responseType: "blob" })
      .subscribe((blob) => {
        const filename = this.extractFilenameFromUrl(imageUrl);
        const file = new File([blob], filename);
        this.product.image = file;
      });
  }

  private extractFilenameFromUrl(url: string): string {
    // Extract filename from the URL
    return url.substring(url.lastIndexOf("/") + 1);
  }

  onImageMouseOver(file: File) {
    this.buttonEl.toArray().forEach((el) => {
      el.nativeElement.id === file.name
        ? (el.nativeElement.style.display = "flex")
        : null;
    });
  }

  onImageMouseLeave(file: File) {
    this.buttonEl.toArray().forEach((el) => {
      el.nativeElement.id === file.name
        ? (el.nativeElement.style.display = "none")
        : null;
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      // form.markAllAsTouched();
      return;
    }
    this.loaderService.show();
    if (this.productId) {
      this.productService.updateProduct(this.product).subscribe({
        next: (res: any) => {
          this.loaderService.hide();
          if (res) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: res?.message || "Product updated successfully",
            });
            this.router.navigate(["product"]);
            // this.router.navigate(["/dashboard"]);
          }
        },
        error: (err) => {
          this.loaderService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message || "Error while updating Product",
          });
          console.log(err);
        },
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: (res: any) => {
          this.loaderService.hide();
          if (res) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: res?.message || "Product created successfully",
            });
            this.router.navigate(["product"]);
            // this.router.navigate(["/dashboard"]);
          }
        },
        error: (err) => {
          this.loaderService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message || "Error while creating Product",
          });
          console.log(err);
        },
      });
    }
  }
}
