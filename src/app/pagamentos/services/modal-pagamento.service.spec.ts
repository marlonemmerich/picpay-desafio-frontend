import { TestBed } from '@angular/core/testing';

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
});
