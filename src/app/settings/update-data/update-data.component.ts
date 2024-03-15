import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {
  isLoadingLayer: boolean = false
  isLoading: boolean = false
  apiMessage: string = ''
  isError: boolean = false
  updateUserDataForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  constructor(
    private _AuthenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoadingLayerMethod()
  }

  isLoadingLayerMethod() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      this.isLoadingLayer = true
    }, 1000)
  }

  updateUserData(dataForm: any) {
    this.isLoading = true
    this._AuthenticationService.updateLoggedUserData(dataForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false
        this.apiMessage = res.message
        this.isError = false
        // this._Router.navigate(['/login'])
        console.log(res)
      },
      error: (err) => {
        this.isLoading = false
        this.isError = true
        this.apiMessage = err.error.errors.msg
        console.log(err)
      }
    })
  }
}
