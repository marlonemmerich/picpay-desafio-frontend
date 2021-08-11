import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/core/user/user.service';
import { Account } from './../../shared/interfaces/account';
 
const APIURL = `${environment.apiUrl}/account`;
 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}
 
  /**
   * Autentica o usuário e retorna sucesso 
   * ou erro em caso de usuário não existente ou senha inválida
   * @param user account
   * @returns observable HttpResponde
   */
  public authenticate(user): Observable<HttpResponse<Account[]>> {
    return this.http
      .get<Account>(`${APIURL}?email=${user.email}`)
      .pipe(
        map((accounts: any) => {
          if(accounts.length){
            return accounts[0]
          } else {
            throw new ErrorEvent('notFound', {message: 'Usuário não cadastrado!'})
          }
          
        }),
        map((account) => {
          if (account && account.password === user.password){
            /** 
             * Grava na localStorage o id no lugar do 
             * Token que seria o certo em uma aplicação real
             */
            this.userService.setSession(account.id);
            return account;
          } else {
            throw new ErrorEvent('accountError', {message: 'Usuário ou Senha inválidos!'})
          }
        })
      );
  }
}
 
 

