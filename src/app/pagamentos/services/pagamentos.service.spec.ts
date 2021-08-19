import { TestBed } from '@angular/core/testing';

import { PagamentosService } from './pagamentos.service';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { noop, of } from 'rxjs';
import { Paginacao } from 'src/app/core/models/paginacao.model';
import { Filtro } from 'src/app/core/models/filtro.model';
import { SortTableHeader } from 'src/app/core/models/sort-table-header.model';
import { SortOrdem } from 'src/app/core/enums/sort-ordem';
import Pagamento from '../models/pagamento.model';

describe('PagamentosService', () => {
  let service: PagamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(PagamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('constructor - deve ter o parâmetro correto', () => {
    expect(service['apiService'] instanceof ApiService).toBeTruthy();
  });

  describe('getPagamentos', () => {

    describe('_start', () => {
      it('paginaAtualé igual a 1 - deve ter parâmetro "_start" igual a 0', () => {
        spyOn(service['apiService'], 'get').and.callFake(() => {
          return of({});
        });

        const _mockPaginacao = new Paginacao();
        _mockPaginacao.paginaAtual = 1;

        const _mockParams = {
          _start: 0,
          _limit: parseInt(_mockPaginacao.quantidadePorPagina, 10)+1
        };

        const _mockHttpParams = new HttpParams({fromObject: _mockParams})

        service.getPagamentos(_mockPaginacao, new Filtro(), new SortTableHeader());

        expect(service['apiService'].get).toHaveBeenCalledWith(service['API_URL'], _mockHttpParams);

      });

      it('é igual a 2 - deve ter', () => {

        spyOn(service['apiService'], 'get').and.callFake(() => {
          return of({});
        });

        const _mockPaginacao = new Paginacao();
        _mockPaginacao.paginaAtual = 2;
        _mockPaginacao.quantidadePorPagina = '5';

        const _mockParams = {
          _start: (2 * 5) - 5,
          _limit: 5+1
        };

        const _mockHttpParams = new HttpParams({fromObject: _mockParams})

        service.getPagamentos(_mockPaginacao, new Filtro(), new SortTableHeader());

        expect(service['apiService'].get).toHaveBeenCalledWith(service['API_URL'], _mockHttpParams);

      });

      it('é maior que 2 - deve ter o valor da página multiplicado pela quantidade por página descrecido da quantidade por página', () => {
        spyOn(service['apiService'], 'get').and.callFake(() => {
          return of({});
        });

        const _mockPaginacao = new Paginacao();
        _mockPaginacao.paginaAtual = 3;
        _mockPaginacao.quantidadePorPagina = '5';

        const _mockParams = {
          _start: (3 * 5) - 5,
          _limit: 5+1
        };

        const _mockHttpParams = new HttpParams({fromObject: _mockParams})

        service.getPagamentos(_mockPaginacao, new Filtro(), new SortTableHeader());

        expect(service['apiService'].get).toHaveBeenCalledWith(service['API_URL'], _mockHttpParams);
      });
    });

    describe('_limit', () => {
      it('quantidade por página é 5 - deve apresentar _limit incrementado (igual a 6)', () => {
        spyOn(service['apiService'], 'get').and.callFake(() => {
          return of({});
        });

        const _mockPaginacao = new Paginacao();
        _mockPaginacao.paginaAtual = 3;
        _mockPaginacao.quantidadePorPagina = '5';

        const _mockParams = {
          _start: (3 * 5) - 5,
          _limit: 5+1
        };

        const _mockHttpParams = new HttpParams({fromObject: _mockParams})

        service.getPagamentos(_mockPaginacao, new Filtro(), new SortTableHeader());

        expect(service['apiService'].get).toHaveBeenCalledWith(service['API_URL'], _mockHttpParams);
      });

      it('quantidade por página é 10 - deve apresentar _limit incrementado (igual a 11)', () => {
        spyOn(service['apiService'], 'get').and.callFake(() => {
          return of({});
        });

        const _mockPaginacao = new Paginacao();
        _mockPaginacao.paginaAtual = 3;
        _mockPaginacao.quantidadePorPagina = '10';

        const _mockParams = {
          _start: (3 * 10) - 10,
          _limit: 10+1
        };

        const _mockHttpParams = new HttpParams({fromObject: _mockParams})

        service.getPagamentos(_mockPaginacao, new Filtro(), new SortTableHeader());

        expect(service['apiService'].get).toHaveBeenCalledWith(service['API_URL'], _mockHttpParams);
      });

      it('quantidade por página é 15 - deve apresentar _limit incrementado (igual a 16)', () => {
        spyOn(service['apiService'], 'get').and.callFake(() => {
          return of({});
        });

        const _mockPaginacao = new Paginacao();
        _mockPaginacao.paginaAtual = 3;
        _mockPaginacao.quantidadePorPagina = '15';

        const _mockParams = {
          _start: (3 * 15) - 15,
          _limit: 15+1
        };

        const _mockHttpParams = new HttpParams({fromObject: _mockParams})

        service.getPagamentos(_mockPaginacao, new Filtro(), new SortTableHeader());

        expect(service['apiService'].get).toHaveBeenCalledWith(service['API_URL'], _mockHttpParams);
      });
    });

    describe('Parâmetro para busca', () => {
      it('valorBusca e chaveBusca são strings vazias- não deve filtrar por nenhum termo', () => {
        spyOn(service['apiService'], 'get').and.callFake(() => {
          return of({});
        });

        const _mockFiltro = new Filtro();
        _mockFiltro.valorBusca = '';
        _mockFiltro.chaveBusca = '';

        const _mockParams = {
          _start: 0,
          _limit: 6 // default
        };

        const _mockHttpParams = new HttpParams({fromObject: _mockParams})

        service.getPagamentos(new Paginacao(), _mockFiltro, new SortTableHeader());

        expect(service['apiService'].get).toHaveBeenCalledWith(service['API_URL'], _mockHttpParams);
      });


      it('valorBusca e chaveBusca preenchidos - deve aplicar os valores corretamente', () => {
        spyOn(service['apiService'], 'get').and.callFake(() => {
          return of({});
        });

        const _mockFiltro = new Filtro();
        _mockFiltro.valorBusca = 'valorDaBusca';
        _mockFiltro.chaveBusca = 'chaveDaBusca';

        const _mockParams = {
          _start: 0,
          _limit: 6, // default
          chaveDaBusca_like: '^.*valorDaBusca.*$'
        };

        const _mockHttpParams = new HttpParams({fromObject: _mockParams})

        service.getPagamentos(new Paginacao(), _mockFiltro, new SortTableHeader());

        expect(service['apiService'].get).toHaveBeenCalledWith(service['API_URL'], _mockHttpParams);
      });
    });
    describe('ordenação', () => {
      it('isSort é false - não deve preencher os campos "_sort" e "_order"', () => {
        spyOn(service['apiService'], 'get').and.callFake(() => {
          return of({});
        });

        const _sortTableHeader = new SortTableHeader();
        _sortTableHeader.isSorting = false;

        const _mockParams = {
          _start: 0,
          _limit: 6, // default
        };

        const _mockHttpParams = new HttpParams({fromObject: _mockParams})

        service.getPagamentos(new Paginacao(), new Filtro(), _sortTableHeader);

        expect(service['apiService'].get).toHaveBeenCalledWith(service['API_URL'], _mockHttpParams);
      });

      it('isSort é true - deve preencher os campos "_sort" e "_order"', () => {
        spyOn(service['apiService'], 'get').and.callFake(() => {
          return of({});
        });

        const _sortTableHeader = new SortTableHeader();
        _sortTableHeader.isSorting = true;
        _sortTableHeader.chaveCampo = 'name';
        _sortTableHeader.sortOrdem = SortOrdem.desc;

        const _mockParams = {
          _start: 0,
          _limit: 6, // default
          _sort: 'name',
          _order: SortOrdem.desc
        };

        const _mockHttpParams = new HttpParams({fromObject: _mockParams})

        service.getPagamentos(new Paginacao(), new Filtro(), _sortTableHeader);

        expect(service['apiService'].get).toHaveBeenCalledWith(service['API_URL'], _mockHttpParams);
      });
    });
  });


  it('getPagamento - deve fazer a chamada corretamente', () => {
    spyOn(service['apiService'], 'get').and.callFake(() => {
      return of({});
    });

    const _id = 1;
    service.getPagamento(_id);

    expect(service['apiService'].get).toHaveBeenCalledWith(`${service['API_URL']}/${_id}`)
  });

  it('removerPagamento - deve fazer a chamada corretamente', () => {
    spyOn(service['apiService'], 'delete').and.callFake(() => {
      return of({});
    });

    const _pagamento = new Pagamento({id: 1})
    service.removerPagamento(_pagamento);

    expect(service['apiService'].delete).toHaveBeenCalledWith(`${service['API_URL']}/${_pagamento.id}`)
  });

  it('cadastrarPagamento - deve fazer a chamada corretamente', () => {
    spyOn(service['apiService'], 'post').and.callFake(() => {
      return of({});
    });

    const _pagamento = new Pagamento({id: 1})
    service.cadastrarPagamento(_pagamento);

    expect(service['apiService'].post).toHaveBeenCalledWith(`${service['API_URL']}`, _pagamento)
  });


  it('editarPagamento - deve fazer a chamada corretamente', () => {
    spyOn(service['apiService'], 'patch').and.callFake(() => {
      return of({});
    });

    const _pagamento = new Pagamento({name: 'abc'})
    const _id = '1';
    service.editarPagamento(_id, _pagamento);

    expect(service['apiService'].patch).toHaveBeenCalledWith(`${service['API_URL']}/${_id}`, _pagamento)
  });

});
