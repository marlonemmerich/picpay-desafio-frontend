import { OnInit, AfterViewInit, Component } from '@angular/core';
import * as M from 'materialize-css';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  isUsuarioLogado: boolean;
  subscriptionLogin: Subscription;

  idHeader: string = 'header-component';
  idDropDownusuario: string = 'dropdown1';
  private headerInstance;
  private dropDownUsuarioInstance;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscriptionLogin = this.authService.usuarioLogado$
    .subscribe(usuarioLogado => {
      this.isUsuarioLogado = usuarioLogado;
      if (this.isUsuarioLogado) {
        this.montarComponentesMenu();
        console.log('???MOUTED?');
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

}
