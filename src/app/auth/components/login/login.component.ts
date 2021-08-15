import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createFormLogin(new User());
  }

  createFormLogin(user: User) {
    this.formLogin = this.formBuilder.group({
      email: [user.email, Validators.required],
      password: [user.password, Validators.required]
    });
  }
s
  login() {
    this.isSubmitted = true;

    if (this.formLogin.invalid) {
      return;
    }

    this.authService.login(this.formLogin.value)
    .pipe(
      finalize(() => {
        this.loadingService.esconder();
      })
    )
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/pagamentos');
      },
      error: error => {

        M.toast({html: (error && error.mensagem) ? error.mensagem : 'Houve um erro ao tentar se logar', displayLength: 3000, classes: 'red'});
      },
    });
  }

}
