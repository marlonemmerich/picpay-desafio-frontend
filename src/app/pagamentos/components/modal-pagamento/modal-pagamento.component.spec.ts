import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarPagamentoComponent } from './modal-pagamento.component';

describe('ModalAdicionarPagamentoComponent', () => {
  let component: ModalAdicionarPagamentoComponent;
  let fixture: ComponentFixture<ModalAdicionarPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionarPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdicionarPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
