import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ModalComponent } from 'src/app/shared/components/app-modal/components/modal/modal.component';
import { ModalConfig, Size } from 'src/app/shared/interfaces/modal-config';
import { Payment } from 'src/app/shared/interfaces/payment';

@Component({
  selector: 'app-modal-excluir-pagamento',
  templateUrl: './modal-excluir-pagamento.component.html',
  providers: [DatePipe]
})
export class ModalExcluirPagamentoComponent implements OnInit {

  public payment!: Payment;

  @ViewChild('modal') modal: ModalComponent;
  @Output() excluirPagamentoEmmiter = new EventEmitter();

  public modalConfig: ModalConfig;

  constructor() { }

  ngOnInit(): void {
    this.initModalConfig();
  }

  public callDeletePayment(){
    this.excluirPagamentoEmmiter.emit(this.payment?.id);
    this.modal.dismiss();
  }

  public open(payment) {
    this.payment = payment;
    this.modal.open();
  }

  public close(){
    this.modal.dismiss();
  }

  private initModalConfig(){
    this.modalConfig = new ModalConfig();
    this.modalConfig.size = Size.MEDIUM;
    this.modalConfig.centered = true;
    this.modalConfig.scrollable = true
  }

}
