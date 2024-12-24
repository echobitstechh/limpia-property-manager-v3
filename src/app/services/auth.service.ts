// auth.service.ts
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER_ID = 'USER_ID';
  private readonly USER_OBJECT = 'USER_OBJECT';
  private apiService: ApiService | undefined;
  constructor(private router: Router, private injector: Injector) {}

  private getApiService(): ApiService {
    if (!this.apiService) {
      this.apiService = this.injector.get(ApiService);
    }
    return this.apiService;
  }
  refreshToken(): Observable<any> {
    return this.getApiService()
      .refreshToken()
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            this.storeJwtToken(response?.data?.accessToken!);
            this.storeRefreshToken(response?.data?.refreshToken!);
          }
        })
      );
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  getUserId() {
    return localStorage.getItem(this.USER_ID);
  }

  getUser(): any {
    const user = localStorage.getItem(this.USER_OBJECT);
    return user ? JSON.parse(user) : null;
  }

  storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  storeRefreshToken(refreshToken: string) {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  storeUserId(userId: string) {
    localStorage.setItem(this.USER_ID, userId);
  }

  storeUser(user: any) {
    localStorage.setItem(this.USER_OBJECT, JSON.stringify(user));
  }

  deleteTokens() {
    // Retrieve the loginDetails item
    const savedLoginDetails = localStorage.getItem('loginDetails');
    const savedCart = localStorage.getItem('cart');
    // Clear all local storage items
    localStorage.clear();
    // Restore the loginDetails item if it exists
    if (savedLoginDetails) {
      localStorage.setItem('loginDetails', savedLoginDetails);
    }
    if (savedCart) {
      localStorage.setItem('cart', savedCart);
    }
  }

  logOut() {
    // Clear all local storage items
    this.deleteTokens();
    // Optionally, navigate the user to the login or home page
    this.router.navigate(['/home']); // Adjust the route as necessary
  }
}
