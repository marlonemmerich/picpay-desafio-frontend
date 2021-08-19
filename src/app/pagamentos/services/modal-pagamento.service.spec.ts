import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import Pagamento from '../models/pagamento.model';

import { ModalPagamentoService } from './modal-pagamento.service';

describe('ModalPagamentoService', () => {
  let service: ModalPagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalPagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('constructor - deve ter os atributos corretos',() => {
    expect(service['status'] instanceof BehaviorSubject).toBeTrue();

    expect(service['pagamento'] instanceof Pagamento).toBeTrue();
    expect(service['pagamento']).toEqual(new Pagamento());
  });

  it('atualizarStatusExclusao - deve fazer a chamada corretamente', () => {
    expect(service.status['_value']).toEqual({sucesso: null, objeto: null});

    const _mockRetornoModal = {
      sucesso: true,
      objeto: new Pagamento({id: 123})
    }

    service.atualizarStatus(_mockRetornoModal);

    expect(service.status['_value']).toEqual(_mockRetornoModal);
  });
});
