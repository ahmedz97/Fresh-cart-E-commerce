import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl: string = "https://ecommerce.routemisr.com"
  userData: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private _HttpClient: HttpClient) { 
    this.decodeUserToken()
  }

  checkOut(cartId: string, shippingAddressData: any): Observable<any> {
    // http://localhost:4200
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=https://abdalrhman80.github.io/Fresh-Cart-App `
      , { shippingAddress: shippingAddressData }
    )
  }

  decodeUserToken() {
    let userToken = JSON.stringify(localStorage.getItem("userToken"))
    let decoded = jwtDecode(userToken)
    this.userData.next(decoded)
  }

  getAllUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${id}`)
  }
}
