import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ModalPagamentoComponent } from 'src/app/pagamentos/components/modal-pagamento/modal-pagamento.component';
import { ModalExclusaoComponent } from './components/modal-exclusao/modal-exclusao.component';
import { PagamentosRoutingModule } from './pagamentos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';


const routes: Routes = [
  {
    path: 'pagamentos',
    component: ListComponent
  }
];

@NgModule({
  declarations: [
    ListComponent,
    ModalPagamentoComponent,
    ModalExclusaoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagamentosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [CurrencyPipe, DatePipe]
})
export class PagamentosModule { }
