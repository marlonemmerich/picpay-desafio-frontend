import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { Payment } from 'src/app/shared/interfaces/payment';
import { ModalExcluirPagamentoComponent } from './components/modal-excluir-pagamento/modal-excluir-pagamento.component';
import { ModalPagamentoComponent } from './components/modal-pagamento/modal-pagamento.component';
import { PaymentService } from './services/payment.service';

@Component({
  selector: 'app-pagamentos-page',
  templateUrl: './pagamentos-page.component.html',
  styleUrls: ['./pagamentos-page.component.scss'],
  providers: [DatePipe]
})
export class PagamentosPageComponent implements OnInit {
  @ViewChild('modalNewPayment') modalNewPayment: ModalPagamentoComponent;
  @ViewChild('modalDeletePayment') modalDeletePayment: ModalExcluirPagamentoComponent;

  payments$: Observable<Payment[]>;

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.payments$ = this.paymentService.getPayments()
  }

  public newPayment(){
    this.modalNewPayment.open();
  }

  public deletePayment(payment: Payment){
    this.modalDeletePayment.open(payment)
  }

  /**
   * Recebe o status do pagamento em booleano 
   * e retorna uma string (Pago ou Pendente)
   * @param isPayed status pagamento
   * @returns retorna uma string 'Pago' ou 'Pendente'
   */
  public getStatus(isPayed){
    return isPayed ? 'Pago' : 'Pendente'
  }

  public receiverExcluirPagamentoEmmiter(idPayment){
    console.log(idPayment)
  }

}
