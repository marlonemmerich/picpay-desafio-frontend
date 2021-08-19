import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { noop, of, throwError } from 'rxjs';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { DatePickup } from '../../models/date-pickup';
import Pagamento from '../../models/pagamento.model';
import { ModalPagamentoService } from '../../services/modal-pagamento.service';
import { PagamentosService } from '../../services/pagamentos.service';
import * as M from 'materialize-css';

import { ModalPagamentoComponent } from './modal-pagamento.component';
import MODAL_OPTIONS from 'src/app/shared/consts/modal.const';

describe('ModalPagamentoComponent', () => {
  let component: ModalPagamentoComponent;
  let fixture: ComponentFixture<ModalPagamentoComponent>;

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

  const _mockDataPickup = new DatePickup({
    data: '21/07/2020',
    hora: '05:53'
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
      ],
      declarations: [ ModalPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('constructor - deve ter os parâmetros corretos', () => {
    expect(component['formBuilder'] instanceof FormBuilder).toBeTruthy();
    expect(component['loadingService'] instanceof LoadingService).toBeTruthy();
    expect(component['pagamentoService'] instanceof PagamentosService).toBeTruthy();
    expect(component['modalPagamentoService'] instanceof ModalPagamentoService).toBeTruthy();

    expect(component['modalInstance']).toBe(undefined);
    expect(component['maskDate']).toEqual([/[0-3]/, /[0-9]/, '/',  /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]);
    expect(component['maskHora']).toEqual([/[0-9]/, /\d/, ':', /\d/, /\d/]);
    expect(component['formPagamento'] instanceof FormGroup).toBeTrue();
    expect(component['isSubmitted']).toBe(false);
    expect(component['estaEditando']).toBe(false);
    expect(component['pagamento']).toEqual(new Pagamento());
    expect(component['dataPickup']).toEqual(new DatePickup());
    expect(component['idModal']).toBe('id-modal-pagamento');
    expect(component['idDatePick']).toBe('id-modal-pagamento-datepick-data');
    expect(component['idTimePick']).toBe('id-modal-pagamento-datepick-hora');

  });

  it('ngOnInit - deve fazer a chamada corretamente', () => {
    spyOn(component, 'registrarForm').and.callFake(noop);

    component.ngOnInit();

    expect(component.registrarForm).toHaveBeenCalled();
  });

  it('registrarForm - deve fazer a chamada correta e setar a variável corretamente', () => {
    spyOn(component['formBuilder'], 'group').and.callThrough();

    component.pagamento = new Pagamento();
    component.registrarForm();

    expect(component['formBuilder'].group).toHaveBeenCalled();
    expect(component['formBuilder'] instanceof FormBuilder).toBeTrue();
  });


  it('abrirModalEditar - deve fazer a chamadas corretas e setar as variáveis corretamente', () => {
    spyOn(component, 'inicializarElementos').and.callFake(noop);
    // Na linha acima fizemos um mock e, portanto, modalInstance ficará null
    // A linha abaixo é para forçar que exista a função "open"

    component['modalInstance'] = {
      open: () => {}
    };
    // Agora podemos fazer o mock:
    spyOn(component['modalInstance'], 'open').and.callFake(noop);

    spyOn(component, 'resetarCampos').and.callFake(noop);
    spyOn(component, 'registrarForm').and.callFake(noop);
    spyOn(component, 'setarCamposValidos').and.callFake(noop);

    const _returnGetData = '21/11/2021';
    const _returnGetHora = '10:10';

    spyOn(component, 'getDataFromDate').and.callFake(() => {
      return _returnGetData;;
    });
    spyOn(component, 'getTime').and.callFake(function() {
      return _returnGetHora;
    });

    component.abrirModalEditar(_mockPagamento);

    expect(component.inicializarElementos).toHaveBeenCalled();
    expect(component['modalInstance'].open).toHaveBeenCalled();

    expect(component.estaEditando).toBeTrue();
    expect(component.pagamento).toEqual(_mockPagamento);

    expect(component.getDataFromDate).toHaveBeenCalledWith(new Date(_mockPagamento.date));
    expect(component.getTime).toHaveBeenCalledWith(new Date(_mockPagamento.date));

    expect(component.dataPickup.data).toEqual(_returnGetData);
    expect(component.dataPickup.hora).toEqual(_returnGetHora);

    expect(component.resetarCampos).toHaveBeenCalled();
    expect(component.registrarForm).toHaveBeenCalled();
    expect(component.setarCamposValidos).toHaveBeenCalled();
  });



  it('abrirModalCriar - deve fazer a chamadas corretas e setar as variáveis corretamente', () => {
    spyOn(component, 'inicializarElementos').and.callFake(noop);
    // Na linha acima fizemos um mock e, portanto, modalInstance ficará null
    // A linha abaixo é para forçar que exista a função "open"

    component['modalInstance'] = {
      open: () => {}
    };
    // Agora podemos fazer o mock:
    spyOn(component['modalInstance'], 'open').and.callFake(noop);

    spyOn(component, 'resetarCampos').and.callFake(noop);
    spyOn(component, 'registrarForm').and.callFake(noop);
    spyOn(component, 'setarCamposValidos').and.callFake(noop);

    const _returnGetData = '21/11/2021';
    const _returnGetHora = '21/11/2021';

    spyOn(component, 'getDataFromDate').and.callFake(() => {
      return _returnGetData;;
    });
    spyOn(component, 'getTime').and.callFake(function() {
      return _returnGetHora;
    });

    component.abrirModalCriar();

    expect(component.inicializarElementos).toHaveBeenCalled();
    expect(component['modalInstance'].open).toHaveBeenCalled();

    expect(component.estaEditando).toBeFalse();
    expect(component.pagamento).toEqual(new Pagamento());

    expect(component.getDataFromDate).not.toHaveBeenCalled();
    expect(component.getTime).not.toHaveBeenCalled();

    expect(component.dataPickup).toEqual(new DatePickup());

    expect(component.resetarCampos).toHaveBeenCalled();
    expect(component.registrarForm).toHaveBeenCalled();
    expect(component.setarCamposValidos).not.toHaveBeenCalled();
  });

  it('fechar', () => {
    // De inicio não temos a modal instance. Vamos setar com a função "close" para poder usar o spyon:
    component['modalInstance'] = {
      close: () => {}
    }
    spyOn(component['modalInstance'], 'close').and.callFake(noop);

    component.fechar();

    expect(component['modalInstance'].close).toHaveBeenCalled();
  });


  it('resetarCampos', fakeAsync(() => {
    spyOn(M, 'updateTextFields').and.callFake(noop);
    spyOn(component['formPagamento'], 'reset').and.callFake(noop);
    spyOn(component['formPagamento'], 'markAsPristine').and.callFake(noop);
    spyOn(component['formPagamento'], 'markAsUntouched').and.callFake(noop);
    spyOn(component['formPagamento'], 'updateValueAndValidity').and.callFake(noop);

    component.resetarCampos();

    // A função de setar remove determinadas classes
    // Vamos inserir algumas para poder testar
    const _achor1 = window.document.createElement('a');
    _achor1.classList.add('invalid')

    const _achor2 = window.document.createElement('a');
    _achor2.classList.add('valid')

    const _achor3 = window.document.createElement('a');
    _achor3.classList.add('valid', 'invalid');

    spyOn(_achor1.classList, 'remove').and.callThrough();
    spyOn(_achor2.classList, 'remove').and.callThrough();
    spyOn(_achor3.classList, 'remove').and.callThrough();

    (window.document.getElementById(component.idModal)).appendChild(_achor1);
    (window.document.getElementById(component.idModal)).appendChild(_achor2);
    (window.document.getElementById(component.idModal)).appendChild(_achor3);

    tick(51);

    expect(component['formPagamento'].reset).toHaveBeenCalled();
    expect(component['formPagamento'].markAsPristine).toHaveBeenCalled();
    expect(component['formPagamento'].markAsUntouched).toHaveBeenCalled();
    expect(component['formPagamento'].updateValueAndValidity).toHaveBeenCalled();

    expect(_achor1.classList.remove).toHaveBeenCalledWith('invalid', 'valid');
    expect(_achor2.classList.remove).toHaveBeenCalledWith('invalid', 'valid');
    expect(_achor3.classList.remove).toHaveBeenCalledWith('invalid', 'valid');

    expect(_achor1.className).toBe('');
    expect(_achor2.className).toBe('');
    expect(_achor3.className).toBe('');

    expect(M.updateTextFields).toHaveBeenCalled();
  }));


  it('setarCamposValidos', fakeAsync(() => {
    spyOn(M, 'updateTextFields').and.callFake(noop);

    component.setarCamposValidos();

    // A função de setar remove determinadas classes
    // Vamos inserir algumas para poder testar
    const _achor1 = window.document.createElement('a');
    _achor1.classList.add('a', 'validate')

    const _achor2 = window.document.createElement('a');
    _achor2.classList.add('b', 'validate')

    const _achor3 = window.document.createElement('a');
    _achor3.classList.add('c', 'validate');

    spyOn(_achor1.classList, 'add').and.callThrough();
    spyOn(_achor2.classList, 'add').and.callThrough();
    spyOn(_achor3.classList, 'add').and.callThrough();

    (window.document.getElementById(component.idModal)).appendChild(_achor1);
    (window.document.getElementById(component.idModal)).appendChild(_achor2);
    (window.document.getElementById(component.idModal)).appendChild(_achor3);

    tick(51);

    expect(_achor1.classList.add).toHaveBeenCalledWith('valid');
    expect(_achor2.classList.add).toHaveBeenCalledWith('valid');
    expect(_achor3.classList.add).toHaveBeenCalledWith('valid');

    expect(_achor1.className).toBe('a validate valid');
    expect(_achor2.className).toBe('b validate valid');
    expect(_achor3.className).toBe('c validate valid');

    expect(M.updateTextFields).toHaveBeenCalled();
  }));

  it('inicializarElementos - deve fazer as chamadas corretamente', () => {
    const _mockElement = document.createElement('a');
    const _mockElementById = document.createElement('a');
    spyOn(document, 'getElementById').and.callFake(() => {
      return _mockElementById;
    });

    spyOn(M.Modal, 'init').and.callFake(() => {
      return _mockElement;
    });

    component.inicializarElementos();

    expect(document.getElementById).toHaveBeenCalledWith(component['idModal']);
    expect(M.Modal.init).toHaveBeenCalledWith(_mockElementById, MODAL_OPTIONS);
    expect(component['modalInstance']).toEqual(_mockElement);
  });

  it('toISOFormat - deve fazer o parse corretamente', () => {
    let expectedArrayData = [
      '2020-07-21T05:53',
      '2020-10-02T23:04',
      '2021-05-25T14:51',
      '2020-10-22T04:24'
    ]

    let arrayStringDatas = [
      '21/07/2020 05:53',
      '02/10/2020 23:04',
      '25/05/2021 14:51',
      '22/10/2020 04:24'
    ]

    arrayStringDatas.forEach((dataString, chave) => {
      expect(component.toISOFormat(dataString)).toEqual(expectedArrayData[chave]);
    })

  })

  it('getDataFromDate - deve fazer o parse corretamente', () => {
    let arrayStringDatas = [
      '2020-07-21T05:53',
      '2020-10-02T23:04',
      '2021-05-25T14:51',
      '2020-10-22T04:24'
    ]

    let expectedArrayData = [
      '21/07/2020',
      '02/10/2020',
      '25/05/2021',
      '22/10/2020'
    ]

    arrayStringDatas.forEach((dataString, chave) => {
      expect(component.getDataFromDate(new Date(dataString))).toEqual(expectedArrayData[chave]);
    })

  })

  it('getTime - deve fazer o parse corretamente', () => {
    let arrayStringDatas = [
      '2020-07-21T05:53',
      '2020-10-02T23:04',
      '2021-05-25T14:51',
      '2020-10-22T04:24'
    ]

    let expectedArrayData = [
      '05:53',
      '23:04',
      '14:51',
      '04:24'
    ]

    arrayStringDatas.forEach((dataString, chave) => {
      expect(component.getTime(new Date(dataString))).toEqual(expectedArrayData[chave]);
    })
  })

  describe('enviarFormulario', () => {
    describe('estaEditando true', () => {
      it('válido', () => {
        const _dateMock = '2020-07-21T05:53';
        component.estaEditando = true;
        spyOn(component, 'editarPagamento').and.callFake(noop);
        spyOn(component, 'enviarPagamento').and.callFake(noop);
        spyOn(component, 'toISOFormat').and.callFake(() => {
          return _dateMock;
        });

        // formulário válido
        component['formPagamento'] = component['formBuilder'].group({
          data: ['21/07/2021'],
          hora: ['05:53'],
          date: ''
        });

        component.enviarFormulario();

        expect(component['formPagamento'].controls.date.value).toEqual(_dateMock);
        expect(component.editarPagamento).toHaveBeenCalled();
        expect(component.enviarPagamento).not.toHaveBeenCalled();

      });
      it('inválido', () => {
        const _dateMock = '2020-07-21T05:53';
        component.estaEditando = true;
        spyOn(component, 'editarPagamento').and.callFake(noop);
        spyOn(component, 'enviarPagamento').and.callFake(noop);
        spyOn(component, 'toISOFormat').and.callFake(() => {
          return _dateMock;
        });

        // formulário inválido
        component['formPagamento'] = component['formBuilder'].group({
          data: ['', Validators.required],
          hora: ['', Validators.required],
          date: ''
        });

        component.enviarFormulario();

        expect(component['formPagamento'].controls.date.value).toEqual('');
        expect(component.enviarPagamento).not.toHaveBeenCalled();
        expect(component.editarPagamento).not.toHaveBeenCalled();
      });
    });

    describe('estaEditando false', () => {
      it('válido', () => {
        const _dateMock = '2020-07-21T05:53';
        component.estaEditando = false;
        spyOn(component, 'editarPagamento').and.callFake(noop);
        spyOn(component, 'enviarPagamento').and.callFake(noop);
        spyOn(component, 'toISOFormat').and.callFake(() => {
          return _dateMock;
        });

        // formulário válido
        component['formPagamento'] = component['formBuilder'].group({
          data: ['21/07/2021'],
          hora: ['05:53'],
          date: ''
        });

        component.enviarFormulario();

        expect(component['formPagamento'].controls.date.value).toEqual(_dateMock);
        expect(component.editarPagamento).not.toHaveBeenCalled();
        expect(component.enviarPagamento).toHaveBeenCalled();

      });
      it('inválido', () => {
        const _dateMock = '2020-07-21T05:53';
        component.estaEditando = false;
        spyOn(component, 'editarPagamento').and.callFake(noop);
        spyOn(component, 'enviarPagamento').and.callFake(noop);
        spyOn(component, 'toISOFormat').and.callFake(() => {
          return _dateMock;
        });

        // formulário inválido
        component['formPagamento'] = component['formBuilder'].group({
          data: ['', Validators.required],
          hora: ['', Validators.required],
          date: ''
        });

        component.enviarFormulario();

        expect(component['formPagamento'].controls.date.value).toEqual('');
        expect(component.enviarPagamento).not.toHaveBeenCalled();
        expect(component.editarPagamento).not.toHaveBeenCalled();
      });
    });
  });

  describe('enviarPagamento', function() {
    it('suceso no retorno - deve fazer as chamadas corretas', () => {
      spyOn(component['loadingService'], 'exibir').and.callFake(noop);
      spyOn(component['loadingService'], 'esconder').and.callFake(noop);
      spyOn(component, 'fechar').and.callFake(noop);
      spyOn(component['modalPagamentoService'], 'atualizarStatus').and.callFake(noop)
      spyOn(M, 'toast').and.callFake(noop);
      spyOn(component['pagamentoService'], 'cadastrarPagamento').and.callFake(() => {
        return of(new Pagamento({id: 123}));
      });

      // form válido
      component['formPagamento'] = component['formBuilder'].group({
        name: [_mockPagamento.name,],
        username: [_mockPagamento.username,],
        title: [_mockPagamento.title],
        value: [_mockPagamento.value,],
        data: [_mockDataPickup.data,],
        hora: [_mockDataPickup.hora,],
        date: [_mockPagamento.date],
        isPayed: [_mockPagamento.isPayed],
      });

      component.enviarPagamento();

      expect(component['loadingService'].exibir).toHaveBeenCalled();
      expect(component['loadingService'].esconder).toHaveBeenCalled();

      expect(M.toast).toHaveBeenCalledWith({html: 'Pagamento criado com sucesso!', displayLength: 3000, classes: 'green'});
      expect(component.fechar).toHaveBeenCalled();
      expect(component['modalPagamentoService'].atualizarStatus).toHaveBeenCalledWith({sucesso: true, objeto: new Pagamento({id: 123})});
    });

    describe('erro no retorno', function() {
      it('com mensagem -  deve fazer as chamadas corretas', () => {
        spyOn(component['loadingService'], 'exibir').and.callFake(noop);
        spyOn(component['loadingService'], 'esconder').and.callFake(noop);
        spyOn(component, 'fechar').and.callFake(noop);
        spyOn(component['modalPagamentoService'], 'atualizarStatus').and.callFake(noop)
        spyOn(M, 'toast').and.callFake(noop);
        spyOn(component['pagamentoService'], 'cadastrarPagamento').and.callFake(() => {
          return throwError({mensagem: 'Error'});
        });

        // form válido
        component['formPagamento'] = component['formBuilder'].group({
          name: [_mockPagamento.name,],
          username: [_mockPagamento.username,],
          title: [_mockPagamento.title],
          value: [_mockPagamento.value,],
          data: [_mockDataPickup.data,],
          hora: [_mockDataPickup.hora,],
          date: [_mockPagamento.date],
          isPayed: [_mockPagamento.isPayed],
        });

        component.enviarPagamento();

        expect(component['loadingService'].exibir).toHaveBeenCalled();
        expect(component['loadingService'].esconder).toHaveBeenCalled();

        expect(M.toast).toHaveBeenCalledWith({html: 'Error', displayLength: 3000, classes: 'red'});
        expect(component.fechar).not.toHaveBeenCalled();
        expect(component['modalPagamentoService'].atualizarStatus).not.toHaveBeenCalled();
      });

      it('sem mensagem -  deve fazer as chamadas corretas', () => {
        spyOn(component['loadingService'], 'exibir').and.callFake(noop);
        spyOn(component['loadingService'], 'esconder').and.callFake(noop);
        spyOn(component, 'fechar').and.callFake(noop);
        spyOn(component['modalPagamentoService'], 'atualizarStatus').and.callFake(noop)
        spyOn(M, 'toast').and.callFake(noop);
        spyOn(component['pagamentoService'], 'cadastrarPagamento').and.callFake(() => {
          return throwError({});
        });

        // form válido
        component['formPagamento'] = component['formBuilder'].group({
          name: [_mockPagamento.name,],
          username: [_mockPagamento.username,],
          title: [_mockPagamento.title],
          value: [_mockPagamento.value,],
          data: [_mockDataPickup.data,],
          hora: [_mockDataPickup.hora,],
          date: [_mockPagamento.date],
          isPayed: [_mockPagamento.isPayed],
        });

        component.enviarPagamento();

        expect(component['loadingService'].exibir).toHaveBeenCalled();
        expect(component['loadingService'].esconder).toHaveBeenCalled();

        expect(M.toast).toHaveBeenCalledWith({html: 'Houve um erro ao tentar criar o pagamento', displayLength: 3000, classes: 'red'});
        expect(component.fechar).not.toHaveBeenCalled();
        expect(component['modalPagamentoService'].atualizarStatus).not.toHaveBeenCalled();
      });
    })
  });

  describe('editarPagamento', function() {
    it('suceso no retorno - deve fazer as chamadas corretas', () => {
      spyOn(component['loadingService'], 'exibir').and.callFake(noop);
      spyOn(component['loadingService'], 'esconder').and.callFake(noop);
      spyOn(component, 'fechar').and.callFake(noop);
      spyOn(component['modalPagamentoService'], 'atualizarStatus').and.callFake(noop)
      spyOn(M, 'toast').and.callFake(noop);
      spyOn(component['pagamentoService'], 'editarPagamento').and.callFake(() => {
        return of(new Pagamento({id: 123}));
      });

      // form válido
      component['formPagamento'] = component['formBuilder'].group({
        name: [_mockPagamento.name,],
        username: [_mockPagamento.username,],
        title: [_mockPagamento.title],
        value: [_mockPagamento.value,],
        data: [_mockDataPickup.data,],
        hora: [_mockDataPickup.hora,],
        date: [_mockPagamento.date],
        isPayed: [_mockPagamento.isPayed],
      });

      component.editarPagamento();

      expect(component['loadingService'].exibir).toHaveBeenCalled();
      expect(component['loadingService'].esconder).toHaveBeenCalled();

      expect(M.toast).toHaveBeenCalledWith({html: 'Pagamento editado com sucesso!', displayLength: 3000, classes: 'green'});
      expect(component.fechar).toHaveBeenCalled();
      expect(component['modalPagamentoService'].atualizarStatus).toHaveBeenCalledWith({sucesso: true, objeto: new Pagamento({id: 123})});
    });

    describe('erro no retorno', function() {
      it('com mensagem -  deve fazer as chamadas corretas', () => {
        spyOn(component['loadingService'], 'exibir').and.callFake(noop);
        spyOn(component['loadingService'], 'esconder').and.callFake(noop);
        spyOn(component, 'fechar').and.callFake(noop);
        spyOn(component['modalPagamentoService'], 'atualizarStatus').and.callFake(noop)
        spyOn(M, 'toast').and.callFake(noop);
        spyOn(component['pagamentoService'], 'editarPagamento').and.callFake(() => {
          return throwError({mensagem: 'Error'});
        });

        // form válido
        component['formPagamento'] = component['formBuilder'].group({
          name: [_mockPagamento.name,],
          username: [_mockPagamento.username,],
          title: [_mockPagamento.title],
          value: [_mockPagamento.value,],
          data: [_mockDataPickup.data,],
          hora: [_mockDataPickup.hora,],
          date: [_mockPagamento.date],
          isPayed: [_mockPagamento.isPayed],
        });

        component.editarPagamento();

        expect(component['loadingService'].exibir).toHaveBeenCalled();
        expect(component['loadingService'].esconder).toHaveBeenCalled();

        expect(M.toast).toHaveBeenCalledWith({html: 'Error', displayLength: 3000, classes: 'red'});
        expect(component.fechar).not.toHaveBeenCalled();
        expect(component['modalPagamentoService'].atualizarStatus).not.toHaveBeenCalled();
      });

      it('sem mensagem -  deve fazer as chamadas corretas', () => {
        spyOn(component['loadingService'], 'exibir').and.callFake(noop);
        spyOn(component['loadingService'], 'esconder').and.callFake(noop);
        spyOn(component, 'fechar').and.callFake(noop);
        spyOn(component['modalPagamentoService'], 'atualizarStatus').and.callFake(noop)
        spyOn(M, 'toast').and.callFake(noop);
        spyOn(component['pagamentoService'], 'editarPagamento').and.callFake(() => {
          return throwError({});
        });

        // form válido
        component['formPagamento'] = component['formBuilder'].group({
          name: [_mockPagamento.name,],
          username: [_mockPagamento.username,],
          title: [_mockPagamento.title],
          value: [_mockPagamento.value,],
          data: [_mockDataPickup.data,],
          hora: [_mockDataPickup.hora,],
          date: [_mockPagamento.date],
          isPayed: [_mockPagamento.isPayed],
        });

        component.editarPagamento();

        expect(component['loadingService'].exibir).toHaveBeenCalled();
        expect(component['loadingService'].esconder).toHaveBeenCalled();

        expect(M.toast).toHaveBeenCalledWith({html: 'Houve um erro ao editar o pagamento', displayLength: 3000, classes: 'red'});
        expect(component.fechar).not.toHaveBeenCalled();
        expect(component['modalPagamentoService'].atualizarStatus).not.toHaveBeenCalled();
      });
    })
  });


});
