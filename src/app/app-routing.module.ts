import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authenticationGuard } from './guards/authentication.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SpecificCategoryComponent } from './components/specific-category/specific-category.component';
import { SpecificBrandsComponent } from './components/specific-brands/specific-brands.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
// import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
// import { VerifycodeComponent } from './components/verifycode/verifycode.component';
// import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "product-details/:id", canActivate: [authenticationGuard], component: ProductDetailsComponent, title: "Product-Details" },
  { path: "cart", canActivate: [authenticationGuard], component: CartComponent, title: "Cart" },
  { path: "wishlist", canActivate: [authenticationGuard], component: WishlistComponent, title: "Wishlist" },
  { path: "products", canActivate: [authenticationGuard], component: ProductsComponent, title: "Products" },
  { path: "categories", canActivate: [authenticationGuard], component: CategoriesComponent, title: "Categories" },
  { path: "category-description/:id", canActivate: [authenticationGuard], component: SpecificCategoryComponent, title: "Category-Description" },
  { path: "brands", canActivate: [authenticationGuard], component: BrandsComponent, title: "Brands" },
  { path: "brand-description/:id", canActivate: [authenticationGuard], component: SpecificBrandsComponent, title: "Brand-Description" },
  { path: "shippingAddress/:cartId", canActivate: [authenticationGuard], component: ShippingAddressComponent, title: "Shipping-Address" },
  { path: "allorders", canActivate: [authenticationGuard], component: AllOrdersComponent, title: "All Orders" },
  { path: "order-details/:id", canActivate: [authenticationGuard], component: OrderDetailsComponent, title: "Order Details" },
  // { path: "forgetPassword", component: ForgetPasswordComponent, title: "Forget Password" },
  // { path: "verifyCode", component: VerifycodeComponent, title: "VerifyCode" },
  // { path: "resetPassword", component: ResetPasswordComponent, title: "Reset Password" },
  { path: "register", component: RegisterComponent, title: "Register" },
  { path: "login", component: LoginComponent, title: "Login" },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: "**", component: NotFoundComponent, title: "Not-Found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
