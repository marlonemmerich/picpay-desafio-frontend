import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';


fdescribe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [],
      providers: []
    })
    .compileComponents();
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('constructor - deve ter as variáveis corretamente', () => {
    expect(guard['authService'] instanceof AuthService).toBeTruthy();
    expect(guard['router'] instanceof Router).toBeTruthy();
  });

  it('Usuário não está logado - deve retornar false e direcionar para o login', () => {

    spyOn(guard['authService'], 'checkStorageUsuarioLogado').and.callFake(() => {
      return false;
    })

    spyOn(guard['router'], 'navigate');

    let returnOf = guard.canActivate();
    expect(returnOf).toBeFalse();
    expect(guard['router'].navigate).toHaveBeenCalledWith(['/login']);
  });

  it('Usuário está logado - deve retornar true', () => {
    spyOn(guard['authService'], 'checkStorageUsuarioLogado').and.callFake(() => {
      return true;
    })

    spyOn(guard['router'], 'navigate');

    let returnOf = guard.canActivate();
    expect(returnOf).toBeTrue();
    expect(guard['router'].navigate).not.toHaveBeenCalled();
  });
});
