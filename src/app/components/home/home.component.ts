import { WishListService } from './../../services/wishlist.service';
import { CartService } from './../../services/cart.service';
import { productData } from 'src/app/interfaces/Product';
import { ProductService } from '../../services/product.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productsList: productData[] = []
  wishListIDs: any[] = []
  cartListIDs: any[] = []
  isUser: boolean = false;
  isLoading: boolean = false;
  pageNumber: number = 0;
  limit: number = 0

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _WishListService: WishListService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    document.body.style.overflow = 'hidden'
    this.getAllProducts();
    if (localStorage.getItem('userToken')) {
      this.isUser = true
      this.getLoggedUserWishList()
      this.getLoggedUserCart()
    }
    else
      this.isUser = false
  }

  getAllProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        document.body.style.overflow = 'auto'
        this.isLoading = false
        this.productsList = response.data
        this.pageNumber = response.currentPage
        this.limit = response.limit
      },
      error: (err) => {
        this.isLoading = false
        console.log(err)
      }
    })
  }

  @ViewChild('product') productCard!: ElementRef
  changePageNumber(e: any) {
    this.pageNumber = e
    window.scrollTo({
      top: this.productCard.nativeElement.offsetTop - 200,
      behavior: 'smooth'
    });
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
