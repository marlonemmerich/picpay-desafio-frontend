import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import Pagamento from '../models/pagamento.model';

import { ModalExclusaoService } from './modal-exclusao.service';

describe('ModalExclusaoService', () => {
  let service: ModalExclusaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalExclusaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('constructor - deve ter os atributos corretos',() => {
    expect(service['statusExclusao'] instanceof BehaviorSubject).toBeTrue();

    expect(service['pagamentoExclusao'] instanceof Pagamento).toBeTrue();
    expect(service['pagamentoExclusao']).toEqual(new Pagamento());
  });

  it('atualizarStatusExclusao - deve fazer a chamada corretamente', () => {
    expect(service.statusExclusao['_value']).toEqual({sucesso: null, objeto: null});

    const _mockRetornoModal = {
      sucesso: true,
      objeto: new Pagamento({id: 123})
    }

    service.atualizarStatusExclusao(_mockRetornoModal);

    expect(service.statusExclusao['_value']).toEqual(_mockRetornoModal);
  });

});
