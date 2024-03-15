import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl: string = "https://ecommerce.routemisr.com"
  numOfCartItems: BehaviorSubject<any> = new BehaviorSubject(0)

  constructor(
    private _HttpClient: HttpClient,
    private toastr: ToastrService
  ) {
    if (localStorage.getItem('userToken')) {
      this.getLoggedUserCart().subscribe({
        next: response => this.numOfCartItems.next(response.numOfCartItems),
        error: err => console.log(err)
      })
    }
  }

  showSuccess(message: string, status: string) {
    this.toastr.success(message, status,
      {
        closeButton: true,
        timeOut: 2500,
        extendedTimeOut: 500,
        progressBar: true,
        tapToDismiss: false,
        positionClass: 'toast-bottom-right'
      });
  }

  showError(message: string, status: string) {
    this.toastr.error(message, status,
      {
        closeButton: true,
        timeOut: 2500,
        extendedTimeOut: 500,
        progressBar: true,
        tapToDismiss: false,
        positionClass: 'toast-bottom-right'
      });
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`
    )
  }

  addProduct(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`
      , { productId: productId }
    )
  }

  RemoveSpecificCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`
    )
  }

  removeAllCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`
    )
  }

  UpdateCartProductQuantity(productId: string, quantity: number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${productId}`
      , { count: quantity }
    )
  }
}
