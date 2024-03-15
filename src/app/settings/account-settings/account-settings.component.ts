import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  userName: string = ''
  userEmail: string = ''
  userRole: string = ''
  isLoading: boolean = true


  constructor(private _AuthenticationService: AuthenticationService) { }
  ngOnInit(): void {
    this.getUserInfo()
    this.isLoadingLayer()
  }
  
  getUserInfo() {
    this._AuthenticationService.decodeUserToken()
    this.userEmail = localStorage.getItem('userEmail') || ''
    this.userName = this._AuthenticationService.userData.getValue().name
    this.userRole = this._AuthenticationService.userData.getValue().role
  }

  isLoadingLayer() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      this.isLoading = false
    }, 1000)
  }
}
