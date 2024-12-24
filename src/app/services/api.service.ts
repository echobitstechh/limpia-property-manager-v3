import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //ALWAYS REVERT BACK TO STAGING URL BEFORE DEPLOYING.
  private baseUrl: string = '';

  // private baseUrl: string = 'http://localhost:3001/api/v1';

  //test admin credentials: email = superadmin@nsecure.com  || password = @nsecureSuperAdmin1234!

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  signupEmail(email: String): Observable<any> {
    const url = `${this.baseUrl}/auth/initial-signup`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email };

    return this.http
      .post<any>(url, body, { headers })
      .pipe(catchError(this.handleError<any>('signupEmail')));
  }

  signupOtp(verificationCode: string): Observable<any> {
    const url = `${this.baseUrl}/auth/verifySignupCode`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      verificationCode: verificationCode,
      userId: this.authService.getUserId(),
    };
    console.log('userId:' + this.authService.getUserId());
    return this.http
      .post<any>(url, body, { headers })
      .pipe(catchError(this.handleError<any>('signupOtp')));
  }

  signupFinal(
    firstName: string,
    lastName: string,
    password: string
  ): Observable<any> {
    const url = `${this.baseUrl}/auth/finalSignup`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      userId: this.authService.getUserId(),
    };

    return this.http
      .post<any>(url, body, { headers })
      .pipe(catchError(this.handleError<any>('signupFinal')));
  }

  updateInstallment(): Observable<any> {
    const url = `${this.baseUrl}/cart/updateInstallmentStatus`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .put<any>(url, { headers })
      .pipe(catchError(this.handleError<any>('updateInstallment')));
  }
  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/auth/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http
      .post<any>(url, body, { headers })
      .pipe(catchError(this.handleError<any>('login')));
  }

  resetPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}/auth/password-reset`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email };

    return this.http
      .post<any>(url, body, { headers })
      .pipe(catchError(this.handleError<any>('resetPassword')));
  }

  updatePassword(
    token: number | string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    const url = `${this.baseUrl}/auth/update-password`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      token,
      password,
      confirmPassword,
    };

    return this.http
      .post<any>(url, body, { headers })
      .pipe(catchError(this.handleError<any>('updatePassword')));
  }

  refreshToken(): Observable<any> {
    const url = `${this.baseUrl}/auth/refresh-token`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { token: this.authService.getRefreshToken() };

    return this.http
      .post<any>(url, body, { headers })
      .pipe(catchError(this.handleError<any>('refreshToken')));
  }

  changePassword(data: any): Observable<any> {
    const url = `${this.baseUrl}/profile/updatePassword`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    console.log(headers.get('Authorization'));

    return this.http
      .put<any>(url, data, { headers })
      .pipe(catchError(this.handleError<any>('changePassword')));
  }

  updateProfile(data: any): Observable<any> {
    const url = `${this.baseUrl}/profile/updateProfile`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .put<any>(url, data, { headers })
      .pipe(catchError(this.handleError<any>('updateProfile')));
  }

  getCategories(): Observable<any> {
    const url = `${this.baseUrl}/categories`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError('getCategories')));
  }

  getCartItems(): Observable<any> {
    const url = `${this.baseUrl}/cart`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError('getCartItems')));
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    const url = `${this.baseUrl}/cart`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });
    const body = { productId, quantity };

    return this.http
      .post<any>(url, body, { headers })
      .pipe(catchError(this.handleError<any>('addToCart')));
  }

  modifyCart(
    productId: string,
    action: 'increment' | 'decrement'
  ): Observable<any> {
    const url = `${this.baseUrl}/cart/modify/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });
    const body = { action };

    return this.http
      .put<any>(url, body, { headers })
      .pipe(catchError(this.handleError<any>('modifyCart')));
  }

  deleteCartItem(productId: string): Observable<any> {
    const url = `${this.baseUrl}/cart/remove/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .delete<any>(url, { headers })
      .pipe(catchError(this.handleError<any>('deleteCartItem')));
  }

  getProducts(): Observable<any> {
    const url = `${this.baseUrl}/products`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError('getProducts')));
  }

  getSingleProduct(productId: string): Observable<any> {
    const url = `${this.baseUrl}/products/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError('getSingleProduct')));
  }

  getServices(): Observable<any> {
    const url = `${this.baseUrl}/services`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError('getServices')));
  }

  getProfileData(): Observable<any> {
    const url = `${this.baseUrl}/profile`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError('getProfileData')));
  }

  postFavorite(productId: any): Observable<any> {
    const url = `${this.baseUrl}/favorites`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });
    const body = { productId };
    return this.http
      .post<any>(url, body, { headers })
      .pipe(catchError(this.handleError('postFavorite')));
  }

  getFavorite(): Observable<any> {
    const url = `${this.baseUrl}/favorites`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError('getFavorite')));
  }

  deleteFavorite(productId: any): Observable<any> {
    const url = `${this.baseUrl}/favorites/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .delete<any>(url, { headers })
      .pipe(catchError(this.handleError('deleteFavorite')));
  }

  // order function
  orderPayment(data: any): Observable<any> {
    const url = `${this.baseUrl}/wallet/initializePayment`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    console.log(data);

    // No need to stringify the data, HttpClient will do that for you
    return this.http
      .post<any>(url, data, { headers })
      .pipe(catchError(this.handleError('orderPayment')));
  }

  // order function
  verifyPayment(reference: string): Observable<any> {
    const url = `${this.baseUrl}/wallet/verifyPayment?reference=${reference}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError('verifyPayment')));
  }

  getBalance(): Observable<any> {
    const url = `${this.baseUrl}/wallet/balance`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError('getBalance')));
  }

  // // testing

  // addToWallet(data: any): Observable<any> {
  //   const url = `${this.baseUrl}/wallet/addToWallet`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.authService.getJwtToken()}`,
  //   });

  //   return this.http
  //     .put<any>(url, data, { headers })
  //     .pipe(catchError(this.handleError('addToWallet')));
  // }

  walletPayment(data: any): Observable<any> {
    const url = `${this.baseUrl}/wallet/walletPayment`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .put<any>(url, data, { headers })
      .pipe(catchError(this.handleError('walletPayment')));
  }

  getOrdersByStatus(status?: string): Observable<any> {
    const url = `${this.baseUrl}/orders`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    let params = new HttpParams();
    if (status) {
      console.log(status);
      params = params.set('status', status);
    }

    return this.http
      .get<any>(url, { headers, params })
      .pipe(catchError(this.handleError('getOrdersByStatus')));
  }

  addAddress(data: any): Observable<any> {
    const url = `${this.baseUrl}/profile/address`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .post<any>(url, data, { headers })
      .pipe(catchError(this.handleError('addAddress')));
  }

  updateAddress(data: any, addressId: string): Observable<any> {
    const url = `${this.baseUrl}/profile/addresses/${addressId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .put<any>(url, data, { headers })
      .pipe(catchError(this.handleError('updateAddress')));
  }

  deleteAddress(addressId: any): Observable<any> {
    const url = `${this.baseUrl}/profile/addresses/${addressId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .delete<any>(url, { headers })
      .pipe(catchError(this.handleError('deleteAddress')));
  }

  getAddress(): Observable<any> {
    const url = `${this.baseUrl}/profile/addresses`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    });

    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError('getAddress')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => error);
    };
  }
}
