import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUp } from '../interfaces/sign-up';
import { SignIn } from '../interfaces/sign-in';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = 'https://ecommerce.routemisr.com'
  userData: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem("userToken"))
      this.decodeUserToken()
  }

  signUp(data: SignUp): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data)
  }

  signIn(data: SignIn): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data)
  }

  decodeUserToken() {
    let userToken = JSON.stringify(localStorage.getItem("userToken"))
    let decoded: any = jwtDecode(userToken)
    this.userData.next(decoded)
    // this.userData = decoded;
  }

  logout() {
    localStorage.removeItem("userToken")
    this.userData.next(null)
    this._Router.navigate(['/login'])
  }

  forgetPassword(UserEmail: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, UserEmail)
  }

  verifyCode(resetCode: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, resetCode)
  }

  resetPassword(userData: object): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`, userData)
  }

  updateLoggedUserData(userData: any) {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/updateMe`, userData)
  }
  
  updateLoggedUserPasswords(userData: any) {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/changeMyPassword`, userData)
  }
}