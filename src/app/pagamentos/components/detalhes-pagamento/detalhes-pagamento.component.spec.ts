import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPagamentoComponent } from './detalhes-pagamento.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import Pagamento from '../../models/pagamento.model';
import { noop, of } from 'rxjs';

describe('DetalhesPagamentoComponent', () => {
  let component: DetalhesPagamentoComponent;
  let fixture: ComponentFixture<DetalhesPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ DetalhesPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('constructor - deve ter os valores corretos', () => {
    expect(component['activatedRoute'] instanceof ActivatedRoute).toBeTruthy();
    expect(component['router'] instanceof Router).toBeTruthy();

    expect(component['pagamento'] instanceof Pagamento).toBeTrue();
    expect(component['pagamento']).toEqual(new Pagamento());
  });

  it('ngOnInit - deve fazer as chamadas corretas', () => {
    let _dataMock = {
      pagamento: {
        id: 1,
        name: "Pennie Dumphries",
        username: "pdumphries0",
        title: "Dental Hygienist",
        value: 19.96,
        date: "2020-07-21T05:53",
        image: "https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1",
        isPayed: true
      }
    }

    // Retornando
    component['activatedRoute'].data = of(_dataMock);

    component.ngOnInit();
    expect(component.pagamento).toEqual(new Pagamento(_dataMock.pagamento));
  })

  it('', () => {
    spyOn(component['router'], 'navigate').and.callFake(() => {
      return Promise.resolve(true);
    });

    component.redirecionarRetornarListagem();

    expect(component['router'].navigate).toHaveBeenCalledWith(['/pagamentos'])
  });

});
