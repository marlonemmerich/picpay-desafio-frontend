import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentosPageComponent } from './pagamentos-page.component';

describe('PagamentosPageComponent', () => {
  let component: PagamentosPageComponent;
  let fixture: ComponentFixture<PagamentosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagamentosPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
