import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { productData } from 'src/app/interfaces/Product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string = ''
  isLoading: boolean = false
  wishListIDs: any[] = []

  productDetails: productData = {
    sold: 0,
    images: [],
    subcategory: [],
    ratingsQuantity: 0,
    _id: '',
    title: '',
    slug: '',
    description: '',
    quantity: 0,
    price: 0,
    imageCover: '',
    category: {
      name: '',
      _id: '',
      slug: ''
    },
    brand: {
      name: '',
      _id: '',
      slug: ''
    },
    ratingsAverage: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: '',
  }

  carouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 600,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 400,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden'
    this.isLoading = true
    this.getProductId();
    this.getProductDetails();
  }

  //////////////// Product Details //////////////////
  getProductId() {
    this._ActivatedRoute.params.subscribe(params => this.productId = params['id'])
  }

  getProductDetails() {
    this._ProductService.getSpecificProduct(this.productId).subscribe({
      next: (response) => {
        this.isLoading = false
        this.productDetails = response.data
        document.body.style.overflow = 'auto'
      },
      error: (err) => {
        this.isLoading = false
        console.log(err);
      },
    })
  }

  //////////////// CartList //////////////////
  addProductToCart(productId: string) {
    this._CartService.addProduct(productId).subscribe({
      next: (response) => {
        this._CartService.showSuccess(response.message, response.status)
        this._CartService.numOfCartItems.next(response.numOfCartItems)
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
