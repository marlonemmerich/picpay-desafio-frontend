import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/app-alert/components/alert/alert.component';

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
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    /**
     * guarda path de onde o usuário está vindo 
     * para para redirecionar de volta após login
     */
    this.route.queryParams.subscribe(params => {
      this.fromUrl = params.fromUrl;
    })

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  /**
   * método para realizar e validar o login do usuário
   */
  public login() { }

}
