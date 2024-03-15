import { CartService } from 'src/app/services/cart.service';

import { AuthenticationService } from './../../services/authentication.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  numOfCartItems: number = 0;
  numOfWishListItems: number = 0;
  @ViewChild('navbarToggler') navbarToggler!: ElementRef
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef

  constructor(
    public _AuthenticationService: AuthenticationService,
    public _CartService: CartService,
    public _WishListService: WishListService
  ) { }


  ngOnInit(): void {
    this.authenticationUser()
    this.getNumberOfCartItems()
    this.getNumberOfWishListItems()
  }

  authenticationUser() {
    this._AuthenticationService.userData.subscribe({
      next: () => {
        this._AuthenticationService.userData.getValue() != null ?
          this.isLogin = true : this.isLogin = false
      }
    })
  }

  getNumberOfCartItems() {
    this._CartService.numOfCartItems.subscribe(() => this.numOfCartItems = this._CartService.numOfCartItems.getValue())
  }

  getNumberOfWishListItems() {
    this._WishListService.numOfWishListItems.subscribe(() => this.numOfWishListItems = this._WishListService.numOfWishListItems.getValue())
  }

  logout() {
    this.closeNav();
    this._AuthenticationService.logout()
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  closeNav() {
    this.navbarToggler.nativeElement.classList.toggle("collapsed")
    this.navbarCollapse.nativeElement.classList.toggle("show")
  }
}

