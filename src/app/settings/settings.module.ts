import { LoaderComponent } from './../components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SettingsComponent,
    AccountSettingsComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    VerifyCodeComponent,
    UpdatePasswordComponent,
    UpdateDataComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    LoaderComponent, //Stand alone component for loading screen
  ]
})
export class SettingsModule { }
