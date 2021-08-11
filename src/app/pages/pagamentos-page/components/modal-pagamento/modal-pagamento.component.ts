import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertComponent } from 'src/app/shared/components/app-alert/components/alert/alert.component';
import { ModalComponent } from 'src/app/shared/components/app-modal/components/modal/modal.component';
import { ModalConfig, Size } from 'src/app/shared/interfaces/modal-config';
import { Payment } from 'src/app/shared/interfaces/payment';
import { InputValidationService } from 'src/app/shared/validations/input-validation/input-validation.service';

@Component({
  selector: 'app-modal-pagamento',
  templateUrl: './modal-pagamento.component.html',
  styles: ['footer button { min-width: 150px; }']
})
export class ModalPagamentoComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('alertForm') alertForm: AlertComponent;
  @Output() NovoPagamentoEmmiter = new EventEmitter();

  public modalConfig: ModalConfig;
  public newPaymentForm: FormGroup

  constructor(
    public validation: InputValidationService, 
    private  fb: FormBuilder
  ) { } 

  ngOnInit(): void {
    this.newPaymentForm = this.fb.group({
      username: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      title: [''],
    })

    this.initModalConfig();
  }

  public open() {
    this.newPaymentForm.reset();
    this.modal.open();
  }

  public close(){
    this.modal.dismiss();
  }

  public savePayment(){
    if (this.newPaymentForm.valid && !this.newPaymentForm.pending) {
    const payment: Payment = this.newPaymentForm.getRawValue()
    console.log(payment)
    } else {
      this.validation.validateAllFormFields(this.newPaymentForm)
    }
  }

  private initModalConfig(){
    this.modalConfig = new ModalConfig();
    this.modalConfig.size = Size.MEDIUM;
    this.modalConfig.centered = true;
    this.modalConfig.scrollable = true
  }

}
