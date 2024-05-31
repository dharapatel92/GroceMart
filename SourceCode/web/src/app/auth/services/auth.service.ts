import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";
import { IUserData } from "../interfaces/user-data-interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userDataStore!: IUserData;

  private userRightsList: any = [];
  private userRightsChange$ = new BehaviorSubject<any>(0);
  userRightsChange = this.userRightsChange$.asObservable();

  constructor(private httpClient: HttpClient) {}

  login(paramsBody: any) {
    return this.httpClient.post(
      `${environment.API_URL}users/login`,
      paramsBody
    );
  }

  logout() {
    localStorage.clear();
    window.location.href = "/auth/login";
  }

  register(paramsBody: any) {
    return this.httpClient.post(
      `${environment.API_URL}users/register`,
      paramsBody
    );
  }

  forgotPassword(params: any) {
    return this.httpClient.get(`${environment.API_URL}users/forgotPassword`, {
      params,
    });
  }

  resetPassword(params: any) {
    return this.httpClient.post(
      `${environment.API_URL}users/resetPassword?email=${params.email}&code=${params.code}&password=${params.password}`,
      params
    );
  }

  getUserRights() {
    this.userRightsChange$.next(true);
  }

  roleCheck(permissionForRole: "ADMIN" | "VENDOR" | "CUSTOMER"): boolean {
    let userData;
    try {
      userData = JSON.parse(localStorage.getItem("user") || "");
    } catch (error) {}

    return !!userData?.roles?.includes(permissionForRole);
  }

  menuShowCheck() {}

  isLoggedIn() {
    let userData;
    try {
      userData = JSON.parse(localStorage.getItem("user") || "");
    } catch (error) {}

    return !!userData;
  }

  getUsers() {
    return this.httpClient.get(`${environment.API_URL}users`);
  }

  getUser(userId: number) {
    return this.httpClient.get(`${environment.API_URL}users/${userId}`);
  }

  updateUser(paramsBody: any) {
    return this.httpClient.post(
      `${environment.API_URL}users/update`,
      paramsBody
    );
  }
}
