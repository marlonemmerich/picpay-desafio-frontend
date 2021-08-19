import { fakeAsync, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { DetalhesPagamentoResolver } from './detalhes-pagamento.resolver';
import { PagamentosService } from '../services/pagamentos.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('DetalhesPagamentoResolver', () => {
  let resolver: DetalhesPagamentoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    });
    resolver = TestBed.inject(DetalhesPagamentoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('construtor - deve ter os atributos corretos', () => {
    expect(resolver['pagamentoService'] instanceof PagamentosService).toBeTruthy();
    expect(resolver['router'] instanceof Router).toBeTruthy();
  });

  it('pagamento encontrado - não deve redirecionar o usuário', fakeAsync(() => {
    spyOn(resolver['router'], 'navigateByUrl').and.callFake(() => {
      return Promise.resolve(true);
    });

    spyOn(resolver['pagamentoService'], 'getPagamento').and.callFake(() => {
      return of({})
    });

    const _mock = new ActivatedRouteSnapshot();
    _mock.params = {id: '1'};

    resolver.resolve(_mock)
      .subscribe(() => {
        expect(resolver['router'].navigateByUrl).not.toHaveBeenCalled();
      });

    expect(resolver['pagamentoService'].getPagamento).toHaveBeenCalledWith('1');
  }));

  it('pagamento não encontrado - deve redirecionar o usuário', fakeAsync(() => {
    spyOn(resolver['router'], 'navigateByUrl').and.callFake(() => {
      return Promise.resolve(true);
    });

    spyOn(resolver['pagamentoService'], 'getPagamento').and.callFake(() => {
      return throwError({});
    });

    const _mock = new ActivatedRouteSnapshot();
    _mock.params = {id: '1'};

    resolver.resolve(_mock)
      .subscribe((retorno) => {
        expect(resolver['router'].navigateByUrl).toHaveBeenCalledWith('/pagamentos');
      });

    expect(resolver['pagamentoService'].getPagamento).toHaveBeenCalledWith('1');
  }));


});
