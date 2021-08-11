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
  providers: [DatePipe],
})
export class PagamentosPageComponent implements OnInit {
  @ViewChild('modalNewPayment') modalNewPayment: ModalPagamentoComponent;
  @ViewChild('modalDeletePayment')
  modalDeletePayment: ModalExcluirPagamentoComponent;

  payments$: Observable<Payment[]>;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.payments$ = this.paymentService.getPayments();
  }

  public newPayment() {
    this.modalNewPayment.open();
  }

  public deletePayment(payment: Payment) {
    this.modalDeletePayment.open(payment);
  }

  /**
   * Recebe o status do pagamento em booleano
   * e retorna uma string (Pago ou Pendente)
   * @param isPayed status pagamento
   * @returns retorna uma string 'Pago' ou 'Pendente'
   */
  public getStatus(isPayed) {
    return isPayed ? 'Pago' : 'Pendente';
  }

  /**
   * recebe emmiter de ModalExcluirPagamento confirmando
   * a exclusão do pagamento e faz um request para deletar
   * esse pagamento
   * @param idPayment id do pagamento
   */
  public receiverExcluirPagamentoEmmiter(idPayment: number) {
    this.paymentService.deletePayments(idPayment).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * recebe emmiter de ModalPagamento confirmando
   * a criação ou edição do pagamento e exibe
   * um toast com a mensagem de sucesso
   * @param text Texto para ser exibido no toast
   */
  public receiverPagamentoEmmiter(text: string) {
    console.log(text);
  }
}
