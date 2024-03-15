import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  isLoadingLayer: boolean = false
  isLoading: boolean = false
  apiMessage: string = ''
  rePasswordError: object = { rePasswordMatch: "rePassword does not match password" }

  updateUserPasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
  }, { validators: this.checkRePassword })

  constructor(
    private _AuthenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.isLoadingLayerMethod()
  }

  checkRePassword(dataForm: any) {
    if (dataForm.get("password")?.value === dataForm.get("rePassword")?.value)
      return null;
    else {
      dataForm.get("rePassword")?.setErrors({ rePasswordMatch: "rePassword does not match password" })
      return { rePasswordMatch: "rePassword does not match password" }
    }
  }

  isLoadingLayerMethod() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      this.isLoadingLayer = true
    }, 1000)
  }

  updatePassword(dataForm: any) {
    this.isLoading = true
    this._AuthenticationService.updateLoggedUserPasswords(dataForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false
        this._AuthenticationService.logout()
        console.log(res)
      },
      error: (err) => {
        this.isLoading = false
        this.apiMessage = err.error.errors.msg
        console.log(err)
      }
    })
  }
}
