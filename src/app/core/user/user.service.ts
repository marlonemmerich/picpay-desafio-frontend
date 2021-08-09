import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Account } from 'src/app/shared/interfaces/account';
 
const APIURL = `${environment.apiUrl}/account`;
const KEY = 'idUser'
 
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }
 
  public setSession(idUser) {
    window.localStorage.setItem(KEY, idUser)
  }

  public getSession(){
    return window.localStorage.getItem(KEY)
}
 
  public logout() {
    window.localStorage.removeItem(KEY)
  }
 
  public isLogged() {
    return !!this.getSession();
  }
 
  public getUser(): Observable<Account> {
    const idUser = window.localStorage.getItem(KEY)
    return this.http.get<Account>(`${APIURL}?id=${idUser}`);
  }
}
 
 

