import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExclusaoComponent } from './modal-exclusao.component';


import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import Pagamento from '../../models/pagamento.model';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ModalExclusaoService } from '../../services/modal-exclusao.service';
import { PagamentosService } from '../../services/pagamentos.service';
import { noop, of, throwError } from 'rxjs';
import * as M from 'materialize-css';
import MODAL_OPTIONS from 'src/app/shared/consts/modal.const';

describe('ModalExclusaoComponent', () => {
  let component: ModalExclusaoComponent;
  let fixture: ComponentFixture<ModalExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ ModalExclusaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('constructor - deve ter as variaveis corretas', () => {
    expect(component['loadingService'] instanceof LoadingService).toBeTruthy();
    expect(component['modalExlusaoService'] instanceof ModalExclusaoService).toBeTruthy();
    expect(component['pagamentoService'] instanceof PagamentosService).toBeTruthy();
    expect(component['idModal']).toBe('id-modal-exclusao-pagamento');
    expect(component['pagamentoExclusao'] instanceof Pagamento).toBeTruthy();
  });

  it('abrir - deve fazer as chamadas corretas', () => {
    const _mockPagamento = new Pagamento({
      id: 1,
      name: "Pennie Dumphries",
      username: "pdumphries0",
      title: "Dental Hygienist",
      value: 19.96,
      date: "2020-07-21T05:53",
      image: "https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1",
      isPayed: true
    })

    component['modalInstance'] = {
      open: () => {}
    }

    spyOn(component, 'inicializarElementos').and.callFake(noop);
    spyOn(component['modalInstance'], 'open').and.callFake(noop);

    component.abrir(_mockPagamento);

    expect(component['pagamentoExclusao']).toEqual(_mockPagamento);
    expect(component.inicializarElementos).toHaveBeenCalled();
    expect(component['modalInstance'].open).toHaveBeenCalled();

  });

  it('fechar - deve fazer as chamadas corretas', () => {
    component['modalInstance'] = {
      close: () => {}
    }

    spyOn(component['modalInstance'], 'close').and.callFake(noop);

    component.fechar();

    expect(component['modalInstance'].close).toHaveBeenCalled();
  });


  it('inicializarElementos - deve fazer as chamadas corretas', () => {
    spyOn(M.Modal, 'init').and.callFake(noop);

    component.inicializarElementos();

    expect(M.Modal.init).toHaveBeenCalledOnceWith(document.getElementById(component['idModal']), MODAL_OPTIONS);

  });


  describe('confirmarExclusao', function() {
    it('suceso no retorno - deve fazer as chamadas corretas', () => {
      spyOn(component['loadingService'], 'exibir').and.callFake(noop);
      spyOn(component['loadingService'], 'esconder').and.callFake(noop);
      spyOn(component, 'fechar').and.callFake(noop);
      spyOn(component['modalExlusaoService'], 'atualizarStatusExclusao').and.callFake(noop)
      spyOn(M, 'toast').and.callFake(noop);
      spyOn(component['pagamentoService'], 'removerPagamento').and.callFake(() => {
        return of(new Pagamento({id: 123}));
      });

      component.pagamentoExclusao = new Pagamento({id: 123});

      component.confirmarExclusao();

      expect(component['loadingService'].exibir).toHaveBeenCalled();
      expect(component['loadingService'].esconder).toHaveBeenCalled();

      expect(M.toast).toHaveBeenCalledWith({html: 'Pagamento removido com sucesso!', displayLength: 3000, classes: 'green'});
      expect(component.fechar).toHaveBeenCalled();
      expect(component['modalExlusaoService'].atualizarStatusExclusao).toHaveBeenCalledWith({sucesso: true, objeto: new Pagamento({id: 123})});
    });

    describe('erro no retorno', function() {
      it('com mensagem -  deve fazer as chamadas corretas', () => {
        spyOn(component['loadingService'], 'exibir').and.callFake(noop);
        spyOn(component['loadingService'], 'esconder').and.callFake(noop);
        spyOn(component, 'fechar').and.callFake(noop);
        spyOn(component['modalExlusaoService'], 'atualizarStatusExclusao').and.callFake(noop)
        spyOn(M, 'toast').and.callFake(noop);
        spyOn(component['pagamentoService'], 'removerPagamento').and.callFake(() => {
          return throwError({mensagem: 'Error'});
        });

        component.confirmarExclusao();

        expect(component['loadingService'].exibir).toHaveBeenCalled();
        expect(component['loadingService'].esconder).toHaveBeenCalled();

        expect(M.toast).toHaveBeenCalledWith({html: 'Error', displayLength: 3000, classes: 'red'});
        expect(component.fechar).not.toHaveBeenCalled();
        expect(component['modalExlusaoService'].atualizarStatusExclusao).not.toHaveBeenCalled();
      });

      it('sem mensagem -  deve fazer as chamadas corretas', () => {
        spyOn(component['loadingService'], 'exibir').and.callFake(noop);
        spyOn(component['loadingService'], 'esconder').and.callFake(noop);
        spyOn(component, 'fechar').and.callFake(noop);
        spyOn(component['modalExlusaoService'], 'atualizarStatusExclusao').and.callFake(noop)
        spyOn(M, 'toast').and.callFake(noop);
        spyOn(component['pagamentoService'], 'removerPagamento').and.callFake(() => {
          return throwError({});
        });

        component.confirmarExclusao();

        expect(component['loadingService'].exibir).toHaveBeenCalled();
        expect(component['loadingService'].esconder).toHaveBeenCalled();

        expect(M.toast).toHaveBeenCalledWith({html: 'Houve um erro ao tentar excluir o pagamento', displayLength: 3000, classes: 'red'});
        expect(component.fechar).not.toHaveBeenCalled();
        expect(component['modalExlusaoService'].atualizarStatusExclusao).not.toHaveBeenCalled();
      });
    })
  });


});
