import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { NoAuthGuard } from './no-auth.guard';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;

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
    guard = TestBed.inject(NoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('constructor - deve ter as variáveis corretamente', () => {
    expect(guard['authService'] instanceof AuthService).toBeTruthy();
    expect(guard['router'] instanceof Router).toBeTruthy();
  });

  it('Usuário não está logado - deve retornar true', () => {

    spyOn(guard['authService'], 'checkStorageUsuarioLogado').and.callFake(() => {
      return false;
    })

    spyOn(guard['router'], 'navigate');

    let returnOf = guard.canActivate();
    expect(returnOf).toBeTrue();
    expect(guard['router'].navigate).not.toHaveBeenCalled();
  });

  it('Usuário está logado - deve redirecionar para listagem de pagamentos e retornar false', () => {
    spyOn(guard['authService'], 'checkStorageUsuarioLogado').and.callFake(() => {
      return true;
    })

    spyOn(guard['router'], 'navigate');

    let returnOf = guard.canActivate();
    expect(returnOf).toBeFalse();
    expect(guard['router'].navigate).toHaveBeenCalledWith(['/pagamentos']);
  });

});
