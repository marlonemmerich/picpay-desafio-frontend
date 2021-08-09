import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Account } from 'src/app/shared/interfaces/account';
import { Rotas } from 'src/app/shared/utils/rotas';

const APIURL = `${environment.apiUrl}/account`;
const KEY = 'idUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  public setSession(idUser) {
    window.localStorage.setItem(KEY, idUser);
  }

  public getSession() {
    return window.localStorage.getItem(KEY);
  }

  public logout() {
    window.localStorage.removeItem(KEY);
    this.router.navigateByUrl(Rotas.LOGIN)
  }

  public isLogged() {
    return !!this.getSession();
  }

  public getUser(): Observable<Account> {
    const idUser = window.localStorage.getItem(KEY);
    return this.http.get<Account>(`${APIURL}?id=${idUser}`).pipe(
      map((accounts: any) => {
        if (accounts.length) {
          return accounts[0];
        } else {
          throw new ErrorEvent('accountError', {
            message: 'Usuário não encontrado!',
          });
        }
      })
    );
  }
}
