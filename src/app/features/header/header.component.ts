import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/core/user/user.service';
import { Account } from 'src/app/shared/interfaces/account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user$!: Observable<Account>

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
  }

  public logout(){
    this.userService.logout();
  }

}
