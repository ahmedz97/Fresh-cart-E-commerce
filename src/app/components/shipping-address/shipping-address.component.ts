import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {
  cartId: string = '';
  isLoadingLayer: boolean = false;
  isLoading: boolean = false;
  apiError: string = ''
  URL: string = ''

  shippingForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
  });

  constructor(
    private _OrdersService: OrdersService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }

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

  sendShippingForm(dataForm: FormGroup) {
    this.isLoading = true;
    this._ActivatedRoute.params.subscribe(params => this.cartId = params['cartId'])
    this._OrdersService.checkOut(this.cartId, dataForm.value).subscribe({
      next: (response) => {
        this.isLoading = false
        if (response.status == "success" && dataForm.status == "VALID") {
          this.URL = response.session.url
          window.location.href = this.URL
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
