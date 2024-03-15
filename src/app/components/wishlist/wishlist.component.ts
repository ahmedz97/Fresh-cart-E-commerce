import { WishListService } from './../../services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { wishlistData } from 'src/app/interfaces/wishlist';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishList: wishlistData[] = []
  wishListIDs: string[] = []
  cartListIDs: string[] = []
  isLoading: boolean = false;
  numOfWishListItems: number = 0;

  constructor(
    private _WishListService: WishListService,
    private _CartService: CartService,
  ) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden'
    this.isLoading = true
    this.getLoggedUserWishList()
    this.getLoggedUserCart()
  }

  //////////////// CartList //////////////////
  getLoggedUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this._CartService.numOfCartItems.next(response.numOfCartItems)
        this.cartListIDs = response.data.products.map((productItem: any) => productItem.product._id)
      },
      error: err => console.log(err)
    })
  }

  addProductToCart(productId: string) {
    this._CartService.addProduct(productId).subscribe({
      next: (response) => {
        this.getLoggedUserCart()
        this._CartService.showSuccess(response.message, response.status)
      },
      error: err => console.log(err)
    })
  }

  removeProductFromCart(productId: string) {
    this._CartService.RemoveSpecificCartItem(productId).subscribe({
      next: (response) => {
        this.getLoggedUserCart()
        this._CartService.showError("Removed from cart", response.status)
      },
      error: err => console.log(err)
    })
  }

  //////////////// WishList //////////////////
  getLoggedUserWishList() {
    this._WishListService.getWishList().subscribe({
      next: (response) => {
        document.body.style.overflow = 'auto'
        this.isLoading = false
        this.wishList = response.data
        this.wishListIDs = this.wishList.map((product: any) => product._id)
        this._WishListService.numOfWishListItems.next(response.count)
      },
      error: (err) => {
        this.isLoading = false
        console.log(err);
      }
    })
  }

  removeProductFromWhishList(productId: string) {
    this._WishListService.removeProductFromList(productId).subscribe({
      next: (response) => {
        this.isLoading = false
        this.isLoading = false
        this.getLoggedUserWishList()
        this._CartService.showError(response.message, response.status)
      },
      error: (err) => {
        this.isLoading = false
        this.isLoading = false
        console.log(err);
      }
    })
  }
}
