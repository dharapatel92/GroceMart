import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRoleGuard } from '../interfaces/role-guard.interface';
import { IUserData } from '../interfaces/user-data-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDataStore!: IUserData;

  private userRightsList: any = [];
  private userRightsChange$ = new BehaviorSubject<any>(0);
  userRightsChange = this.userRightsChange$.asObservable();

  constructor() {}

  login() {}

  logout() {}

  getUserRights() {
    this.userRightsChange$.next(true);
  }

  roleCheck(permissionForRole: IRoleGuard): boolean {
    return true;
  }

  menuShowCheck() {}
}
