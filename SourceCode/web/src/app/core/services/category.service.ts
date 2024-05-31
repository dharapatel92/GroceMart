import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Category } from "../interfaces/category.interface";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  addNewCategory(params: Category) {
    return this.httpClient.post(
      `${environment.API_URL}product/category`,
      params
    );
  }

  getCategoryList() {
    return this.httpClient.get(`${environment.API_URL}product/AllCategory`);
  }

  updateCategory(params: Category) {
    return this.httpClient.put(
      `${environment.API_URL}product/category`,
      params
    );
  }

  deleteCategory(categoryid: number) {
    let userData;
    userData = JSON.parse(localStorage.getItem("user") || "");
    const userId = userData?.id;
    return this.httpClient.delete(
      `${environment.API_URL}product/category/${categoryid}/${userId}`
    );
  }
}
