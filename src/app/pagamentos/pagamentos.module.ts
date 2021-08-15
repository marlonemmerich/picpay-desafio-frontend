import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ModalPagamentoComponent } from 'src/app/pagamentos/components/modal-pagamento/modal-pagamento.component';
import { ModalExclusaoComponent } from './components/modal-exclusao/modal-exclusao.component';
import { PagamentosRoutingModule } from './pagamentos-routing.module';
import { SharedModule } from '../shared/shared.module';

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
  ]
})
export class PagamentosModule { }
