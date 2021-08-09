import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Rotas } from 'src/app/shared/utils/rotas';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AlertComponent } from 'src/app/shared/components/app-alert/components/alert/alert.component';
import { InputValidationService } from 'src/app/shared/validations/input-validation/input-validation.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public fromUrl!: string;

  @ViewChild('alertLogin') alertLogin: AlertComponent;

  constructor(
    public validation: InputValidationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    /**
     * guarda o path de onde o usuário está vindo 
     * para para redirecionar de volta após login
     */
    this.route.queryParams.subscribe(params => {
      this.fromUrl = params.fromUrl;
    })

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  /**
   * autentica o login do usuário e redireciona para 
   * página de pagamentos ou a rota que tentou acessar anteriormente
   */
  public login() {
    if (this.loginForm.valid && !this.loginForm.pending) {
      this.authService.authenticate(this.loginForm.value).subscribe(
        () => {
          this.fromUrl
            ? this.router.navigateByUrl(this.fromUrl)
            : this.router.navigateByUrl(Rotas.PAGAMENTOS);
        },
        (error) => {
          console.log(error);
          this.alertLogin.clear();
          this.alertLogin.danger(error.message);
          this.loginForm.get('password').reset();
        }
      );
    } else {
      this.validation.validateAllFormFields(this.loginForm)
    }

  }

}
