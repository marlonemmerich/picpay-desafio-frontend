import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly API_URL = 'http://localhost:3000/account';
  private usuarioLogado = new BehaviorSubject<boolean>(false); // true is your initial value
  usuarioLogado$ = this.usuarioLogado.asObservable();

  constructor(
    private apiService: ApiService
  ) {}
  private readonly TOKEN_USER: string = 'user-token';

  setarUsuarioLocalStorage(user: User) {
    localStorage.setItem(this.TOKEN_USER, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_USER);
  }

  login(user: User): any {
    return new Observable(observer => {
      this.apiService.get(this.API_URL)
      .subscribe({
        next: (users: Array<any>) => {
          users.forEach((userServer: any) => {
            if (userServer.email === user.email && userServer.password === user.password) {
              this.setarUsuarioLocalStorage(userServer);
              this.isUsuarioLogado = true;
              observer.next({msg: 'Usuário autenticado com sucesso!'});
              observer.complete();
            }
          });
          observer.error({mensagem: 'E-mail e/ou senha incorretos!'});
          observer.complete();
        },
        error: error => {
          observer.error({mensagem: 'Houve um erro desconhecido ao tentar se logar'});
          observer.complete();
        },
      });

    });
  }

  private set isUsuarioLogado(value: boolean) {
    this.usuarioLogado.next(value);
  }

  private get isUsuarioLogado(): boolean {
    return this.isUsuarioLogado;
  }

  checkStorageUsuarioLogado(): boolean {
    if (!!this.getUserFromStorage()) {
      this.isUsuarioLogado = true;
      return true;
    }

    this.isUsuarioLogado = false;
    return false;
  }

  getUserFromStorage(): User {
    return JSON.parse(localStorage.getItem(this.TOKEN_USER));
  }

}
