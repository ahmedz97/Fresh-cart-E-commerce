import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { SpecificCategoryComponent } from './components/specific-category/specific-category.component';
import { SpecificBrandsComponent } from './components/specific-brands/specific-brands.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MainCarouselComponent } from './components/main-carousel/main-carousel.component';
import { SliceStringPipe } from './pipes/slice-string.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AddHeaderInterceptor } from './add-header.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArrowUpComponent } from './components/arrow-up/arrow-up.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    BrandsComponent,
    ProductsComponent,
    CategoriesComponent,
    CartComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    // LoaderComponent,
    SpecificCategoryComponent,
    SpecificBrandsComponent,
    CarouselComponent,
    MainCarouselComponent,
    SliceStringPipe,
    SearchPipe,
    ShippingAddressComponent,
    WishlistComponent,
    AllOrdersComponent,
    OrderDetailsComponent,
    ArrowUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    LoaderComponent, //Stand alone component for loading screen
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
