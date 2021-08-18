import { TestBed } from '@angular/core/testing';

import { DetalhesPagamentoResolver } from './detalhes-pagamento.resolver';

describe('DetalhesPagamentoResolver', () => {
  let resolver: DetalhesPagamentoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetalhesPagamentoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
