import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  // let _Router = new Router()
  let _Router = inject(Router)
  if (localStorage.getItem("userToken"))
    return true
  else {
    _Router.navigate(['/login'])
    return false
  }
};
