import { Component } from "@angular/core";
import { ProductService } from "../core/services/product.service";
import { SharedModule } from "../shared/shared.module";
import { CategoryService } from "../core/services/category.service";
import { LoaderService } from "../core/services/loader.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-category",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./category.component.html",
  styleUrl: "./category.component.scss",
})
export class CategoryComponent {
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.loaderService.show();
    this.productService.getCategoryList().subscribe({
      next: (res: any) => {
        this.loaderService.hide();
        console.log(res);
        this.categories = res.data || [];
      },
      error: (err) => {
        this.loaderService.hide();
        console.log(err);
      },
    });
  }

  deleteCategory(catId: number) {
    this.loaderService.show();
    this.categoryService.deleteCategory(catId).subscribe({
      next: (res: any) => {
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: res.message || "Category deleted successfully",
        });
        this.getCategories();
      },
      error: (err) => {
        this.loaderService.hide();
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message || "Error while Deleting Category",
        });
        console.log(err);
      },
    });
  }
}
