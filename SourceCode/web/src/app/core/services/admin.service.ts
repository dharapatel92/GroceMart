import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  updateVendorStatus(userId: number) {
    return this.httpClient.put(
      `${environment.API_URL}admin/active/vendor/${userId}`,
      ""
    );
  }
}
