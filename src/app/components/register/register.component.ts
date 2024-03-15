import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading: boolean = false;
  apiError: string = '';
  isLoadingLayer: boolean = false;
  rePasswordError: object = { rePasswordMatch: "rePassword does not match password" }

  isLoadingLayerMethod() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      this.isLoadingLayer = true
    }, 1000)
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.checkRePassword })

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
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

  registerFormMethod(dataForm: FormGroup) {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this._AuthenticationService.signUp(dataForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this._Router.navigate(['/login'])
            this.isLoading = false
          }
        },
        error: (err) => {
          console.log(err);
          this.apiError = err.error.message
          this.isLoading = false
        }
      })
    }
  }


}