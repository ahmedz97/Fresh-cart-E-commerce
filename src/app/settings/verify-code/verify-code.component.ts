import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {

  isLoadingLayer: boolean = false
  isLoading: boolean = false
  apiError: string = ''

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) { }
  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6,10}$/)]),
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

  verifyCode(dataForm: FormGroup) {
    this.isLoading = true
    this._AuthenticationService.verifyCode(dataForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        this._Router.navigate(['/settings/resetPassword'])
      },
      error: (err) => {
        this.isLoading = false
        this.apiError = err.error.message
        console.log(err);
      }
    })
  }

}

