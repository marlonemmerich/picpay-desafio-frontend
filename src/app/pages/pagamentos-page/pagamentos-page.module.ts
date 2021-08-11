import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagamentosPageRoutingModule } from './pagamentos-page-routing.module';
import { PagamentosPageComponent } from './pagamentos-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalExcluirPagamentoComponent } from './components/modal-excluir-pagamento/modal-excluir-pagamento.component';
import { ModalPagamentoComponent } from './components/modal-pagamento/modal-pagamento.component';

@NgModule({
  declarations: [PagamentosPageComponent, ModalPagamentoComponent, ModalExcluirPagamentoComponent],
  imports: [
    CommonModule,
    PagamentosPageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagamentosPageModule { }
