import { AfterViewInit, Component } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  idHeader: string = 'header-component';
  idDropDownusuario: string = 'dropdown1';
  private headerInstance;
  private dropDownUsuarioInstance;
  constructor(
  ) { }

  ngAfterViewInit(): void {
    M.Sidenav.init(document.querySelector('.sidenav'));

    M.Dropdown.init(document.querySelector('.dropdown-trigger'));

  }

}
