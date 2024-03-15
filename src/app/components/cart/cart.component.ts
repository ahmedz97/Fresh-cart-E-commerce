import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductElement } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: ProductElement[] = [];
  cartId: string = '';
  numOfCartItems: number = 0;
  totalCartPrice: number = 0;
  isLoading: boolean = false

  constructor(
    private _CartService: CartService,
  ) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden'
    this.isLoading = true
    this.getLoggedUserCart()
  }

  updateCart(response: any) {
    this.cartList = response.data.products
    this.numOfCartItems = response.numOfCartItems
    this.totalCartPrice = response.data.totalCartPrice
  }

  getLoggedUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: response => {
        document.body.style.overflow = 'auto'
        this.isLoading = false
        this.cartId = response.data._id
        this.updateCart(response)
      },
      error: err => {
        this.isLoading = false
        console.log(err);
      }
    })
  }

  removeProductFromCart(productId: string) {
    this._CartService.RemoveSpecificCartItem(productId).subscribe({
      next: response => {
        this.updateCart(response)
        this._CartService.showError("Removed from cart", response.status)
        this._CartService.numOfCartItems.next(response.numOfCartItems)
      },
      error: err => console.log(err)
    })
  }

  removeCartProducts() {
    this._CartService.removeAllCart().subscribe({
      next: response => {
        this._CartService.numOfCartItems.next(response.numOfCartItems)
        this.cartList = []
        this.numOfCartItems = 0
        this.totalCartPrice = 0
        this._CartService.showError("Removed from cart", response.status)
      },
      error: err => console.log(err)
    })
  }

  UpdateProductQuantity(productId: string, quantity: number, e: any) {
    if (e.target.classList.contains('fa-plus') || e.target.classList.contains('fa-minus'))
      e.target.classList.add('fa-spinner', 'fa-spin')
    else
      e.target.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'

    this._CartService.UpdateCartProductQuantity(productId, quantity).subscribe({
      next: response => {
        this.updateCart(response)
        this._CartService.showSuccess("Updated your cart", response.status)
        this._CartService.numOfCartItems.next(response.numOfCartItems)
      },
      error: err => console.log(err)
    })
  }

}
