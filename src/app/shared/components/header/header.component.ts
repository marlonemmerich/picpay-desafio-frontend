import { OnInit, AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  isUsuarioLogado: boolean;
  subscriptionLogin: Subscription;
  usuario: User;

  idHeader = 'header-component';
  idDropDownusuario = 'dropdown1';
  private headerInstance;
  private dropDownUsuarioInstance;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subscriptionLogin = this.authService.usuarioLogado$
    .subscribe(usuarioLogado => {
      this.isUsuarioLogado = usuarioLogado;
      if (this.isUsuarioLogado) {
        this.montarComponentesMenu();
        this.usuario = this.authService.getUserFromStorage();
      }
    });
  }

  ngAfterViewInit(): void {
    this.montarComponentesMenu();
  }

  montarComponentesMenu() {
    window.setTimeout(() => {
      M.Sidenav.init(document.querySelector('.sidenav'));
      M.Dropdown.init(document.querySelector('.dropdown-trigger'));
    }, 100);
  }

  deslogar() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
