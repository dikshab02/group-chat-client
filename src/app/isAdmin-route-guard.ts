import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpCallService } from './http-call.service';

@Injectable({
  providedIn: 'root',
})
export class isAdminService implements CanActivate {

  constructor() {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const logdInUser = JSON.parse(loggedInUser);
      if (logdInUser.isAdmin === 'true') {
        return true;
      }
    }

    return false;
  }
}
