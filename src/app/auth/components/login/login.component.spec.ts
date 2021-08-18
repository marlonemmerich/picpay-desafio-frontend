import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import * as M from 'materialize-css';

import { LoginComponent } from './login.component';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { noop, of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado corretamente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter as variáveis corretamente', () => {
    expect(component['authService'] instanceof AuthService).toBeTruthy();
    expect(component['formBuilder'] instanceof FormBuilder).toBeTruthy();
    expect(component['loadingService'] instanceof LoadingService).toBeTruthy();
    expect(component['router'] instanceof Router).toBeTruthy();

    expect(component.formLogin instanceof FormGroup).toBeTruthy();
    expect(component.isSubmitted).toBeFalse();
  });

  it('onInit - precisa fazer as chamadas corretamente', () => {
    spyOn(component, 'createFormLogin').and.callThrough();
    expect(component).toBeTruthy();

    component.ngOnInit();

    expect(component.createFormLogin).toHaveBeenCalledWith(new User());
  });

  describe('login', () => {
    it('formulário inválido - deve permanecer na página e fazer as chamadas corretas', () => {
      spyOn(component['loadingService'], 'exibir').and.callFake(noop);
      spyOn(component['loadingService'], 'esconder').and.callFake(noop);
      spyOn(component['authService'], 'login').and.callFake(() => {
        return of({});
      });
      spyOn(component['router'], 'navigateByUrl');
      spyOn(M, 'toast').and.callFake(noop);

      // form invalido
      component.formLogin = component['formBuilder'].group({
        email: ['', Validators.required],
      });

      component.login();

      expect(component.isSubmitted).toBeTrue();
      expect(component['loadingService'].exibir).not.toHaveBeenCalled();
      expect(component['loadingService'].esconder).not.toHaveBeenCalled();
      expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
      expect(M.toast).not.toHaveBeenCalled();
    });

    it('formulário válido - com sucesso - deve permanecer na página e fazer as chamadas corretas', () => {
      spyOn(component['loadingService'], 'exibir').and.callFake(noop);
      spyOn(component['loadingService'], 'esconder').and.callFake(noop);
      spyOn(component['authService'], 'login').and.callFake(() => {
        return of({});
      });
      spyOn(component['router'], 'navigateByUrl');
      spyOn(M, 'toast').and.callFake(noop);

      // form valido
      component.formLogin = component['formBuilder'].group({
        email: ['email@provedor.com', Validators.required],
      });

      component.login();

      expect(component.isSubmitted).toBeTrue();
      expect(component['loadingService'].exibir).toHaveBeenCalled();
      expect(component['loadingService'].esconder).toHaveBeenCalled();
      expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/pagamentos');
      expect(M.toast).not.toHaveBeenCalled();
    });

    it('formulário válido - sem sucesso na requisição - com mensagem de erro - deve permanecer na página e fazer as chamadas corretas', () => {
      spyOn(component['loadingService'], 'exibir').and.callFake(noop);
      spyOn(component['loadingService'], 'esconder').and.callFake(noop);
      spyOn(component['authService'], 'login').and.callFake(() => {
        return throwError({mensagem: 'Error'});
      });
      spyOn(component['router'], 'navigateByUrl');
      spyOn(M, 'toast').and.callFake(noop);

      // form valido
      component.formLogin = component['formBuilder'].group({
        email: ['email@provedor.com', Validators.required],
      });

      component.login();

      expect(component.isSubmitted).toBeTrue();
      expect(component['loadingService'].exibir).toHaveBeenCalled();
      expect(component['loadingService'].esconder).toHaveBeenCalled();
      expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
      expect(M.toast).toHaveBeenCalledWith({html: 'Error', displayLength: 3000, classes: 'red'});
    });

    it('formulário válido - sem sucesso na requisição - sem mensagem de erro - deve permanecer na página e fazer as chamadas corretas', () => {
      spyOn(component['loadingService'], 'exibir').and.callFake(noop);
      spyOn(component['loadingService'], 'esconder').and.callFake(noop);
      spyOn(component['authService'], 'login').and.callFake(() => {
        return throwError({});
      });
      spyOn(component['router'], 'navigateByUrl');
      spyOn(M, 'toast').and.callFake(noop);

      // form valido
      component.formLogin = component['formBuilder'].group({
        email: ['email@provedor.com', Validators.required],
      });

      component.login();

      expect(component.isSubmitted).toBeTrue();
      expect(component['loadingService'].exibir).toHaveBeenCalled();
      expect(component['loadingService'].esconder).toHaveBeenCalled();
      expect(component['router'].navigateByUrl).not.toHaveBeenCalled();
      expect(M.toast).toHaveBeenCalledWith({html: 'Houve um erro ao tentar se logar', displayLength: 3000, classes: 'red'});
    });
  })

});
