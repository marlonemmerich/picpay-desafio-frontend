import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ListComponent } from './list.component';
import { PagamentosService } from '../../services/pagamentos.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ModalExclusaoService } from '../../services/modal-exclusao.service';
import { ModalPagamentoService } from '../../services/modal-pagamento.service';
import { ModalExclusaoComponent } from '../modal-exclusao/modal-exclusao.component';
import { ModalPagamentoComponent } from '../modal-pagamento/modal-pagamento.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { SortTableHeader } from 'src/app/core/models/sort-table-header.model';
import { Paginacao } from 'src/app/core/models/paginacao.model';
import { Filtro } from 'src/app/core/models/filtro.model';
import { noop, of, throwError } from 'rxjs';
import * as M from 'materialize-css';
import Pagamento from '../../models/pagamento.model';
import { SortOrdem } from 'src/app/core/enums/sort-ordem';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let _mockedArrayPagamentos = [
    {
      id: 1,
      name: "Pennie Dumphries",
      username: "pdumphries0",
      title: "Dental Hygienist",
      value: 19.96,
      date: "2020-07-21T05:53:20Z",
      image: "https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1",
      isPayed: true
    },
    {
      id: 2,
      name: "Foster Orthmann",
      username: "forthmann1",
      title: "Professor",
      value: 207.36,
      date: "2021-01-28T14:01:29Z",
      image: "https://robohash.org/quasetqui.png?size=150x150&set=set1",
      isPayed: true
    },
    {
      id: 3,
      name: "Crissie Summerill",
      username: "csummerill2",
      title: "VP Product Management",
      value: 464.54,
      date: "2020-02-09T18:20:32Z",
      image: "https://robohash.org/natusinciduntsapiente.png?size=150x150&set=set1",
      isPayed: false
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TextMaskModule,
      ],
      declarations: [
        ListComponent,
        ModalExclusaoComponent,
        ModalPagamentoComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Constructor - deve ter as variáveis corretas', () => {
    expect(component['pagamentosService'] instanceof PagamentosService).toBeTruthy();
    expect(component['loadingService'] instanceof LoadingService).toBeTruthy();
    expect(component['modalExclusaoService'] instanceof ModalExclusaoService).toBeTruthy();
    expect(component['modalPagamentoService'] instanceof ModalPagamentoService).toBeTruthy();
    expect(component['router'] instanceof Router).toBeTruthy();

    expect(component['sortTableHeadersSelecionado'] instanceof SortTableHeader).toBeTruthy();
    expect(component['pagamentosList'] instanceof Array).toBeTruthy();
    expect(component['paginacao'] instanceof Paginacao).toBeTruthy();
    expect(component['filtro'] instanceof Filtro).toBeTruthy();
    expect(component['filtro']).toEqual(new Filtro({
      chaveBusca: 'name',
      valorBusca: '',
    }));
    expect(component['sortTableHeaders'] instanceof Array).toBeTruthy();
    expect(component['sortTableHeaders']).toEqual([
      new SortTableHeader({
        textoCampo: 'Usuário',
        chaveCampo: 'name'
      }),
      new SortTableHeader({
        textoCampo: 'Título',
        chaveCampo: 'title'
      }),
      new SortTableHeader({
        textoCampo: 'Data',
        chaveCampo: 'date'
      }),
      new SortTableHeader({
        textoCampo: 'Valor',
        chaveCampo: 'value'
      }),
      new SortTableHeader({
        textoCampo: 'Pago',
        chaveCampo: 'isPayed'
      }),
    ]);
    expect(component['sortTableHeadersSelecionado'] instanceof SortTableHeader).toBeTruthy();
    expect(component['sortTableHeadersSelecionado']).toEqual(new SortTableHeader({}));
  });

  describe('ngOnInit', () => {

    it('deve fazer as chamas corretas', () => {
      spyOn(component, 'obterPagamentos').and.callFake(noop);
      spyOn(component, 'montarElemenetosMaterialize').and.callFake(noop);

      component.ngOnInit();
      expect(component.obterPagamentos).toHaveBeenCalled();
      expect(component.montarElemenetosMaterialize).toHaveBeenCalled();
    })

    it('após a inicialização deve ter subscribe correto para alteração no statusExclusao da modalExclusaoService - retorno com sucesso', () => {
      spyOn(component, 'obterPagamentosResetandoPagina').and.callFake(noop);

      component.ngOnInit();

      component['modalExclusaoService'].atualizarStatusExclusao({sucesso: true, objeto: {}});

      expect(component.obterPagamentosResetandoPagina).toHaveBeenCalled();
    })

    it('após a inicialização deve ter subscribe correto para alteração no statusExclusao da modalExclusaoService - retorno sem sucesso', () => {
      spyOn(component, 'obterPagamentosResetandoPagina').and.callFake(noop);

      component.ngOnInit();

      component['modalExclusaoService'].atualizarStatusExclusao({sucesso: false, objeto: {}});

      expect(component.obterPagamentosResetandoPagina).not.toHaveBeenCalled();
    })

    it('após a inicialização deve ter subscribe correto para alteração no statusExclusao da modalPagamentoService - retorno com sucesso', () => {
      spyOn(component, 'obterPagamentosResetandoPagina').and.callFake(noop);

      component.ngOnInit();

      component['modalPagamentoService'].atualizarStatus({sucesso: true, objeto: {}});

      expect(component.obterPagamentosResetandoPagina).toHaveBeenCalled();
    })

    it('após a inicialização deve ter subscribe correto para alteração no statusExclusao da modalPagamentoService - retorno sem sucesso', () => {
      spyOn(component, 'obterPagamentosResetandoPagina').and.callFake(noop);

      component.ngOnInit();

      component['modalPagamentoService'].atualizarStatus(({sucesso: false, objeto: {}}));

      expect(component.obterPagamentosResetandoPagina).not.toHaveBeenCalled();
    })
  })

  it('montarElemenetosMaterialize - deve fazer a chamada corretamente', fakeAsync(() => {
    spyOn(M.FormSelect, 'init').and.callFake(noop);

    component.montarElemenetosMaterialize();
    tick(51);

    expect(M.FormSelect.init).toHaveBeenCalledWith(document.querySelectorAll('select'));
  }));

  it('redirecionarPagamento - deve fazer o redirecionamento corretamente', function() {
    spyOn(component['router'], 'navigate').and.callFake(() => {
      return Promise.resolve(true);
    });

    component.redirecionarPagamento('1');

    expect(component['router'].navigate).toHaveBeenCalledWith(['/pagamento/', '1']);
  });


  describe('obterPagamentos', function() {
    describe('sucesso no retorno', () => {
      it('possui 1 pagamento a mais do que a quantidade por pagina informada - deve fazer as chamadas corretas e ter os valores corretos', () => {
        spyOn(component['loadingService'], 'exibir').and.callFake(noop);
        spyOn(component['loadingService'], 'esconder').and.callFake(noop);
        spyOn(component['pagamentosService'], 'getPagamentos').and.callFake(() => {
          return of(_mockedArrayPagamentos); // retorna 3
        });

        spyOn(M, 'toast').and.callFake(noop);

        component.paginacao.quantidadePorPagina = '2'; // precisamos de 2

        component.obterPagamentos();

        expect(component['loadingService'].exibir).toHaveBeenCalled();
        expect(component['loadingService'].esconder).toHaveBeenCalled();

        expect(M.toast).not.toHaveBeenCalled();
        expect(component.paginacao.possuiProximaPagina).toBeTruthy();
        expect(component.pagamentosList.length).toBe(2);
        expect(component.pagamentosList[0]).toEqual(Object.assign(new Pagamento(), _mockedArrayPagamentos[0]));
        expect(component.pagamentosList[1]).toEqual(Object.assign(new Pagamento(), _mockedArrayPagamentos[1]));

      });

      it('não possui 1 pagamento a mais do que a quantidade por pagina informada - deve fazer as chamadas corretas e ter os valores corretos', () => {
        spyOn(component['loadingService'], 'exibir').and.callFake(noop);
        spyOn(component['loadingService'], 'esconder').and.callFake(noop);
        spyOn(component['pagamentosService'], 'getPagamentos').and.callFake(() => {
          return of([_mockedArrayPagamentos[0], _mockedArrayPagamentos[1]]); // retorna 2
        });

        spyOn(M, 'toast').and.callFake(noop);

        component.paginacao.quantidadePorPagina = '2'; // precisamos de 2

        component.obterPagamentos();

        expect(component['loadingService'].exibir).toHaveBeenCalled();
        expect(component['loadingService'].esconder).toHaveBeenCalled();

        expect(M.toast).not.toHaveBeenCalled();
        expect(component.paginacao.possuiProximaPagina).toBeFalse();
        expect(component.pagamentosList.length).toBe(2);
        expect(component.pagamentosList[0]).toEqual(Object.assign(new Pagamento(), _mockedArrayPagamentos[0]));
        expect(component.pagamentosList[1]).toEqual(Object.assign(new Pagamento(), _mockedArrayPagamentos[1]));
      });
    })


    describe('erro no retorno', () => {
      it('com mensagem - deve fazer as chamadas corretas', () => {
        spyOn(component['loadingService'], 'exibir').and.callFake(noop);
        spyOn(component['loadingService'], 'esconder').and.callFake(noop);
        spyOn(component['pagamentosService'], 'getPagamentos').and.callFake(() => {
          return throwError({mensagem: 'Error'});
        });

        spyOn(M, 'toast').and.callFake(noop);

        component.paginacao.quantidadePorPagina = '2';

        component.obterPagamentos();

        expect(component['loadingService'].exibir).toHaveBeenCalled();
        expect(component['loadingService'].esconder).toHaveBeenCalled();

        expect(M.toast).toHaveBeenCalledWith({html: 'Error', displayLength: 3000, classes: 'red'});
        expect(component.paginacao.possuiProximaPagina).toBeFalse();
        expect(component.pagamentosList.length).toBe(0);
      });

      it('sem mensagem - - deve fazer as chamadas corretas', () => {
        spyOn(component['loadingService'], 'exibir').and.callFake(noop);
        spyOn(component['loadingService'], 'esconder').and.callFake(noop);
        spyOn(component['pagamentosService'], 'getPagamentos').and.callFake(() => {
          return throwError({});
        });

        spyOn(M, 'toast').and.callFake(noop);

        component.paginacao.quantidadePorPagina = '2';

        component.obterPagamentos();

        expect(component['loadingService'].exibir).toHaveBeenCalled();
        expect(component['loadingService'].esconder).toHaveBeenCalled();

        expect(M.toast).toHaveBeenCalledWith({html: 'Houve um erro  desconhecido ao obter os pagamentos', displayLength: 3000, classes: 'red'});
        expect(component.paginacao.possuiProximaPagina).toBeFalse();
        expect(component.pagamentosList.length).toBe(0);
      });
    });
  });

  describe('obterPagamentosPaginaAnterior', () => {
    it('chamado com paramâmetro 0 (zero) - não deve fazer nenhuma chamada para obterPagamentosPaginacao', () => {
      spyOn(component, 'obterPagamentosPaginacao').and.callFake(noop);

      component.obterPagamentosPaginaAnterior(0);

      expect(component.obterPagamentosPaginacao).not.toHaveBeenCalled();
    })

    it('chamado com paramâmetro maior que zero - deve fazer a chamada para obterPagamentosPaginacao', () => {
      spyOn(component, 'obterPagamentosPaginacao').and.callFake(noop);

      component.obterPagamentosPaginaAnterior(1);

      expect(component.obterPagamentosPaginacao).toHaveBeenCalledWith(1);
    })
  });

  describe('obterPagamentosPaginacaoPosterior', () => {
    it('não possui próxima página - não deve fazer a chamada para obterPagamentosPaginacao', () => {
      spyOn(component, 'obterPagamentosPaginacao').and.callFake(noop);

      component.obterPagamentosPaginacaoPosterior(1, false);

      expect(component.obterPagamentosPaginacao).not.toHaveBeenCalled();
    });

    it('possui próxima página - deve fazer a chamada para obterPagamentosPaginacao', () => {
      spyOn(component, 'obterPagamentosPaginacao').and.callFake(noop);

      component.obterPagamentosPaginacaoPosterior(1, true);

      expect(component.obterPagamentosPaginacao).toHaveBeenCalledWith(1);
    });
  })

  it('obterPagamentosPaginacao - deve fazer a chamada corretamente para obterPagamentos e setar o valor correto da página', () => {
    spyOn(component, 'obterPagamentos').and.callFake(noop);

    component.paginacao.paginaAtual = 1;

    component.obterPagamentosPaginacao(2);

    expect(component.paginacao.paginaAtual).toBe(2);
    expect(component.obterPagamentos).toHaveBeenCalled();
  });

  it('obterPagamentosResetandoPagina - deve fazer a chamada corretamente para obterPagamentos e setar o valor correto da página', () => {
    spyOn(component, 'obterPagamentos').and.callFake(noop);

    component.paginacao.paginaAtual = 4;

    component.obterPagamentosResetandoPagina();

    expect(component.paginacao.paginaAtual).toBe(1);
    expect(component.obterPagamentos).toHaveBeenCalled();
  });

  it('selecionarSortAsc - deve fazer a chamda correta para selecionarSort com o parâmetro correto', () => {
    spyOn(component, 'selecionarSort').and.callFake(noop);

    const _mockSortHead = new SortTableHeader({textoCampo: 'aaa'});

    component.selecionarSortAsc(_mockSortHead);

    expect(component.selecionarSort).toHaveBeenCalledWith(_mockSortHead, SortOrdem.asc);
  });

  it('selecionarSortDesc - deve fazer a chamda correta para selecionarSort com o parâmetro correto', () => {
    spyOn(component, 'selecionarSort').and.callFake(noop);

    const _mockSortHead = new SortTableHeader({textoCampo: 'aaa'});

    component.selecionarSortDesc(_mockSortHead);

    expect(component.selecionarSort).toHaveBeenCalledWith(_mockSortHead, SortOrdem.desc);
  });

  describe('selecionarSort', () => {

    it('sortHeader está como isSorting e sortOdem está diferente da ordem do sortHeader - deve setar as variáveis e fazer as chamadas corretamente', () => {
      const _mockSortHeader = new SortTableHeader({isSorting: true, sortOrdem: SortOrdem.asc});
      spyOn(_mockSortHeader, 'setSortStatus').and.callFake(noop);
      spyOn(component, 'obterPagamentosResetandoPagina').and.callFake(noop);

      //Vamos criar 2 elementos sortHeader:
      const _mockSortHeaderComponent1 = new SortTableHeader({sortOrdem: SortOrdem.asc});
      const _mockSortHeaderComponent2 = new SortTableHeader({sortOrdem: SortOrdem.asc});

      spyOn(_mockSortHeaderComponent1, 'resetSortStatus').and.callFake(noop);
      spyOn(_mockSortHeaderComponent2, 'resetSortStatus').and.callFake(noop);

      // Vamos adicioná-los dentro do component
      component.sortTableHeaders.push(_mockSortHeaderComponent1, _mockSortHeaderComponent2);

      component.selecionarSort(_mockSortHeader, SortOrdem.desc);

      // A função possui 1 loop que chama "resetSortStatus" para cada elemento
      // Logo:
      expect(_mockSortHeaderComponent1.resetSortStatus).toHaveBeenCalled();
      expect(_mockSortHeaderComponent2.resetSortStatus).toHaveBeenCalled();

      expect(_mockSortHeader.setSortStatus).toHaveBeenCalledWith(_mockSortHeader.sortOrdem, _mockSortHeader.isSorting, SortOrdem.desc);
    });

    it('sortHeader não está como isSorting e sortOdem está igual da ordem do sortHeader - deve setar as variáveis e fazer as chamadas corretamente', () => {
      const _mockSortHeader = new SortTableHeader({isSorting: false, sortOrdem: SortOrdem.desc});
      spyOn(_mockSortHeader, 'setSortStatus').and.callFake(noop);
      spyOn(component, 'obterPagamentosResetandoPagina').and.callFake(noop);

      //Vamos criar 2 elementos sortHeader:
      const _mockSortHeaderComponent1 = new SortTableHeader({sortOrdem: SortOrdem.asc});
      const _mockSortHeaderComponent2 = new SortTableHeader({sortOrdem: SortOrdem.asc});

      spyOn(_mockSortHeaderComponent1, 'resetSortStatus').and.callFake(noop);
      spyOn(_mockSortHeaderComponent2, 'resetSortStatus').and.callFake(noop);

      // Vamos adicioná-los dentro do component
      component.sortTableHeaders.push(_mockSortHeaderComponent1, _mockSortHeaderComponent2);

      component.selecionarSort(_mockSortHeader, SortOrdem.desc);

      // A função possui 1 loop que chama "resetSortStatus" para cada elemento
      // Logo:
      expect(_mockSortHeaderComponent1.resetSortStatus).toHaveBeenCalled();
      expect(_mockSortHeaderComponent2.resetSortStatus).toHaveBeenCalled();

      expect(_mockSortHeader.setSortStatus).toHaveBeenCalledWith(_mockSortHeader.sortOrdem, _mockSortHeader.isSorting, SortOrdem.desc);
    });

    it('sortHeader está como isSorting e sortOdem está igual da ordem do sortHeader (ambos desc) - não deve setar as variáveis e fazer as chamadas', () => {
      const _mockSortHeader = new SortTableHeader({isSorting: true, sortOrdem: SortOrdem.desc});
      spyOn(_mockSortHeader, 'setSortStatus').and.callFake(noop);
      spyOn(component, 'obterPagamentosResetandoPagina').and.callFake(noop);

      //Vamos criar 2 elementos sortHeader:
      const _mockSortHeaderComponent1 = new SortTableHeader({sortOrdem: SortOrdem.asc});
      const _mockSortHeaderComponent2 = new SortTableHeader({sortOrdem: SortOrdem.asc});

      spyOn(_mockSortHeaderComponent1, 'resetSortStatus').and.callFake(noop);
      spyOn(_mockSortHeaderComponent2, 'resetSortStatus').and.callFake(noop);

      // Vamos adicioná-los dentro do component
      component.sortTableHeaders.push(_mockSortHeaderComponent1, _mockSortHeaderComponent2);

      component.selecionarSort(_mockSortHeader, SortOrdem.desc);

      // A função possui 1 loop que chama "resetSortStatus" para cada elemento
      // Logo:
      expect(_mockSortHeaderComponent1.resetSortStatus).not.toHaveBeenCalled();
      expect(_mockSortHeaderComponent2.resetSortStatus).not.toHaveBeenCalled();

      expect(_mockSortHeader.setSortStatus).not.toHaveBeenCalled();
    });

    it('sortHeader está como isSorting e sortOdem está igual da ordem do sortHeader (ambos asc) - não deve setar as variáveis e fazer as chamadas', () => {
      const _mockSortHeader = new SortTableHeader({isSorting: true, sortOrdem: SortOrdem.asc});
      spyOn(_mockSortHeader, 'setSortStatus').and.callFake(noop);
      spyOn(component, 'obterPagamentosResetandoPagina').and.callFake(noop);

      //Vamos criar 2 elementos sortHeader:
      const _mockSortHeaderComponent1 = new SortTableHeader({sortOrdem: SortOrdem.asc});
      const _mockSortHeaderComponent2 = new SortTableHeader({sortOrdem: SortOrdem.asc});

      spyOn(_mockSortHeaderComponent1, 'resetSortStatus').and.callFake(noop);
      spyOn(_mockSortHeaderComponent2, 'resetSortStatus').and.callFake(noop);

      // Vamos adicioná-los dentro do component
      component.sortTableHeaders.push(_mockSortHeaderComponent1, _mockSortHeaderComponent2);

      component.selecionarSort(_mockSortHeader, SortOrdem.asc);

      // A função possui 1 loop que chama "resetSortStatus" para cada elemento
      // Logo:
      expect(_mockSortHeaderComponent1.resetSortStatus).not.toHaveBeenCalled();
      expect(_mockSortHeaderComponent2.resetSortStatus).not.toHaveBeenCalled();

      expect(_mockSortHeader.setSortStatus).not.toHaveBeenCalled();
    });

  })

});
