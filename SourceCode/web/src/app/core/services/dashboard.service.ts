import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/services/auth.service";
import { orderStatus } from "./cart.service";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getAdminReport(status: orderStatus = "COMPLETED") {
    const params = {
      userId: this.authService.getUserId(),
      year: 2024,
      status,
    };
    return this.httpClient.post(`${environment.API_URL}admin/report`, params);
  }

  getKpiAdminReport() {
    let params = new HttpParams().set("userId", this.authService.getUserId());
    return this.httpClient.post(`${environment.API_URL}admin/kpi`, params);
  }
}
