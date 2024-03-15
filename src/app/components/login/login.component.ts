import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiError: string = '';
  isLoading: boolean = false;
  isLoadingLayer: boolean = false;

  isLoadingLayerMethod() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      this.isLoadingLayer = true
    }, 1000)
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,
    Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  })

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) { }

  ngOnInit(): void {
    this.isLoadingLayerMethod()
  }

  loginFormMethod(dataForm: FormGroup) {
    this.isLoading = true;
    this._AuthenticationService.signIn(dataForm.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          localStorage.setItem("userToken", res.token)
          localStorage.setItem("userEmail", this.loginForm.get('email')?.value)
          this._AuthenticationService.decodeUserToken()
          this.isLoading = false
          this._Router.navigate(['/home'])
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
        this.apiError = err.error.message
      }
    })
  }

}