import { Component, OnInit } from '@angular/core';
import { productData } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsList: productData[] = []
  wishListIDs: any[] = []
  cartListIDs: any[] = []
  searchedItem: string = ''
  isLoading: boolean = false;
  addedToWishList: boolean = false

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _WishListService: WishListService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getAllProducts();
    this.getLoggedUserCart()
    this.getLoggedUserWishList()
  }

  getAllProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.isLoading = false
        this.productsList = response.data
      },
      error: (err) => {
        this.isLoading = false
        console.log(err)
      }
    })
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
        this._WishListService.numOfWishListItems.next(response.count)
        this.wishListIDs = response.data.map((product: any) => product._id)
      },
      error: err => console.log(err)
    })
  }

  addProductToWhishList(productId: string) {
    this._WishListService.addProductToList(productId).subscribe({
      next: (response) => {
        this.getLoggedUserWishList()
        this._CartService.showSuccess(response.message, response.status)
      },
      error: err => console.log(err)
    })
  }

  removeProductFromWhishList(productId: string) {
    this._WishListService.removeProductFromList(productId).subscribe({
      next: (response) => {
        this.getLoggedUserWishList()
        this._CartService.showError(response.message, response.status)
      },
      error: err => console.log(err)
    })
  }

}
