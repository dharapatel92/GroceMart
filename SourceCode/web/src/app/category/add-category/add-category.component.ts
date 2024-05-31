import { Component } from "@angular/core";
import { Category } from "../../core/interfaces/category.interface";
import { CategoryService } from "../../core/services/category.service";
import { SharedModule } from "../../shared/shared.module";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "../../core/services/loader.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-add-category",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./add-category.component.html",
  styleUrl: "./add-category.component.scss",
})
export class AddCategoryComponent {
  catId!: number;
  category: Category = {
    id: 0,
    categoryName: "",
    active: true,
  };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.catId = this.route.snapshot.params["id"];
    if (this.catId) {
      this.loaderService.show();
      this.categoryService.getCategoryList().subscribe({
        next: (res: any) => {
          this.loaderService.hide();
          if (res) {
            const category = res.data.find((el: any) => el.id == this.catId);
            this.category.id = category?.id;
            this.category.categoryName = category?.categoryName;
            this.category.active = category?.active;
            // this.router.navigate(["/dashboard"]);
          }
        },
        error: (err) => {
          console.log(err);
          this.loaderService.hide();
        },
      });
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      // form
      return;
    }
    this.loaderService.show();
    if (this.catId) {
      this.categoryService.updateCategory(this.category).subscribe({
        next: (res: any) => {
          this.loaderService.hide();
          if (res) {
            this.router.navigate(["categories"]);
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: res.message || "Category Updated successfully",
            });
            // this.router.navigate(["/dashboard"]);
          }
        },
        error: (err) => {
          console.log(err);
          this.loaderService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message || "Error while updating Category",
          });
        },
      });
    } else {
      this.categoryService.addNewCategory(this.category).subscribe({
        next: (res: any) => {
          this.loaderService.hide();
          if (res) {
            this.router.navigate(["categories"]);
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: res.message || "Category Added successfully",
            });
            // this.router.navigate(["/dashboard"]);
          }
        },
        error: (err) => {
          this.loaderService.hide();
          console.log(err);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message || "Error while creating Category",
          });
        },
      });
    }
  }
}
