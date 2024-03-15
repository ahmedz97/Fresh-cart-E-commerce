import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  isLoadingLayer: boolean = false
  isLoading: boolean = false
  apiError: string = ''

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) { }

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })

  ngOnInit(): void {
    this.isLoadingMethod()
  }

  isLoadingMethod() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      this.isLoadingLayer = true
    }, 1000)
  }

  forgetPassword(dataForm: FormGroup) {
    this.isLoading = true
    this._AuthenticationService.forgetPassword(dataForm.value).subscribe({
      next: (response) => {
        this.isLoading = false
        this._Router.navigate(['/settings/verifyCode'])
        // this.showModelMessage = true
        // this.apiResponse = response.message
      },
      error: (err) => {
        this.isLoading = false
        // this.showModelMessage = true
        // this.apiResponse = response.message
        this.apiError = err.error.message
        console.log(err);
      }
    })
  }

}
