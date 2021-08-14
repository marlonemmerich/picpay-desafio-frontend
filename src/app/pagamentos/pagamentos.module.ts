import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ModalPagamentoComponent } from 'src/app/pagamentos/components/modal-pagamento/modal-pagamento.component';

const routes: Routes = [
  {
    path: 'pagamentos',
    component: ListComponent
  }
];

@NgModule({
  declarations: [
    ListComponent,
    ModalPagamentoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class PagamentosModule { }
