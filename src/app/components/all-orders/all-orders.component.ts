import { AllOrders } from 'src/app/interfaces/all-orders';
import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  orders: AllOrders[] = []
  userId: string = ''
  isLoading: boolean = false

  constructor(private _OrdersService: OrdersService) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden'
    this.isLoading = true
    this._OrdersService.decodeUserToken()
    this._OrdersService.userData.subscribe({
      next: () => this.userId = this._OrdersService.userData.getValue().id
    })
    this.getAllOrders()
  }

  getAllOrders() {
    this._OrdersService.getAllUserOrders(this.userId).subscribe({
      next: (response) => {
        document.body.style.overflow = 'auto'
        this.isLoading = false
        this.orders = response
      },
      error: (err) => {
        this.isLoading = false
        console.log(err)
      }
    })
  }

}
