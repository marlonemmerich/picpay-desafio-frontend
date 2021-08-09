import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/core/user/user.service';
import { Rotas } from 'src/app/shared/utils/rotas';
 
@Injectable({ providedIn: 'root' })
export class LoginPageGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.userService.isLogged()) {
      this.router.navigate([Rotas.PAGAMENTOS]);
      return false;
    }
    return true;
  }
}
 
 

