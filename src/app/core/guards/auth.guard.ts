import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Rotas } from 'src/app/shared/utils/rotas';
import { UserService } from './../user/user.service';
 
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.userService.isLogged()) {
      this.router.navigate([Rotas.LOGIN], {
        queryParams: {
          fromUrl: state.url,
        },
      });
      return false;
    }
    return true;
  }
}