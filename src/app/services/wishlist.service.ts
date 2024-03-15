import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  baseUrl: string = "https://ecommerce.routemisr.com"
  numOfWishListItems: BehaviorSubject<any> = new BehaviorSubject(0)

  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('userToken')) {
      this.getWishList().subscribe({
        next: response => this.numOfWishListItems.next(response.count),
        error: err => console.log(err)
      })
    }
  }

  getWishList(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`
    )
  }

  addProductToList(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,
      { productId: productId }
    )
  }

  removeProductFromList(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${productId}`
    )
  }

}
