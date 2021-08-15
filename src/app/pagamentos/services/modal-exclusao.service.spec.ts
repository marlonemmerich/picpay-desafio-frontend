import { TestBed } from '@angular/core/testing';

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
});
