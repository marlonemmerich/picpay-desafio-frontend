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
 
  authenticate(user): Observable<HttpResponse<any>> {
    return this.http
      .get<Account>(`${APIURL}?email=${user.email}`, {
        observe: 'response',
      })
      .pipe(
        map((res) => {
          if (res.body[0] && user.password === res.body[0].password){
            this.userService.setSession(res.body[0].id);
            return res.body[0];
          } else {
            throw new Error('Usuário ou Senha Inválidos!')
          }
        })
      );
  }
}
 
 

