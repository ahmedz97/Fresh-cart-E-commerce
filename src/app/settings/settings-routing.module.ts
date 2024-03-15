import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';

const routes: Routes = [
  { path: '', redirectTo: 'account-settings', pathMatch: 'full' },
  { path: 'accountSettings', component: AccountSettingsComponent, title: "Account Settings" },
  { path: "forgetPassword", component: ForgetPasswordComponent, title: "Forget Password" },
  { path: "verifyCode", component: VerifyCodeComponent, title: "verifyCode" },
  { path: "resetPassword", component: ResetPasswordComponent, title: "Reset Password" },
  { path: "updatePassword", component: UpdatePasswordComponent, title: "Update Password" },
  { path: "updateData", component: UpdateDataComponent, title: "Update Data" },
  { path: "**", component: NotFoundComponent, title: "Not-Found" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
