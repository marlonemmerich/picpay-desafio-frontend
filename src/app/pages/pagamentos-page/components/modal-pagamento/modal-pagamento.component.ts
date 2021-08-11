import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertComponent } from 'src/app/shared/components/app-alert/components/alert/alert.component';
import { ModalComponent } from 'src/app/shared/components/app-modal/components/modal/modal.component';
import { ModalConfig, Size } from 'src/app/shared/interfaces/modal-config';
import { Payment } from 'src/app/shared/interfaces/payment';
import { CreateUsername } from 'src/app/shared/utils/create-username';
import { FormatDate } from 'src/app/shared/utils/format-date';
import { InputValidationService } from 'src/app/shared/validations/input-validation/input-validation.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-modal-pagamento',
  templateUrl: './modal-pagamento.component.html',
  styles: ['footer button { min-width: 150px; }'],
})
export class ModalPagamentoComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('alertForm') alertForm: AlertComponent;
  @Output() pagamentoEmmiter = new EventEmitter();

  public modalConfig: ModalConfig;
  public newPaymentForm: FormGroup;
  public isEdit: boolean = false;
  private idToEdit!: number;

  constructor(
    public validation: InputValidationService,
    private fb: FormBuilder,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.newPaymentForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      title: [''],
    });

    this.initModalConfig();
  }

  public open(isEdit: boolean, payment?: Payment) {
    this.isEdit = isEdit;
    this.newPaymentForm.reset();

    /**
     * Caso seja para editar chama método
     * para carregar dados no form
     */
    if (payment && isEdit === true) {
      this.idToEdit = payment.id;
      this.fillPaymentForm(payment);
    }

    this.modal.open();
  }

  public close() {
    this.modal.dismiss();
  }

  /**
   * Verifica se o form está válido, estando válido
   * edita ou salva o pagamento emitindo um evento
   * para o componente filho, em caso de erro exibe um alerta.
   */
  public savePayment() {
    if (this.newPaymentForm.valid && !this.newPaymentForm.pending) {
      this.alertForm.clear();

      const payment: Payment = {
        name: this.newPaymentForm.get('name').value,
        username: CreateUsername.transformNameToUsername(
          this.newPaymentForm.get('name').value
        ),
        value: parseInt(this.newPaymentForm.get('value').value),
        date: FormatDate.formatNgbDateToDate(
          this.newPaymentForm.get('date').value
        ),
        title: this.newPaymentForm.get('title').value,
        isPayed: false,
      };
      console.log(payment);

      this.isEdit
        ? this.callAddPayments(payment)
        : this.callEditPayments(payment);
    } else {
      this.validation.validateAllFormFields(this.newPaymentForm);
    }
  }

  /**
   * Request POST para adicionar pagamento no backend
   * @param payment pagamento(tasks)
   */
  private callAddPayments(payment: Payment) {
    this.paymentService.addPayments(payment).subscribe(
      (res) => {
        console.log(res);
        this.pagamentoEmmiter.emit('Pagamento salvo com sucesso!');
        this.modal.dismiss();
      },
      (error) => {
        console.log(error);
        this.alertForm.danger(
          'Algo inesperado aconteceu, tente novamente em alguns minutos!'
        );
      }
    );
  }

  /**
   * Request PATCH para adicionar pagamento no backend
   * @param payment pagamento(tasks)
   */
  private callEditPayments(payment: Payment) {
    this.paymentService.editPayments(this.idToEdit, payment).subscribe(
      (res) => {
        console.log(res);
        this.pagamentoEmmiter.emit('Pagamento alterado com sucesso!');
        this.modal.dismiss();
      },
      (error) => {
        console.log(error);
        this.alertForm.danger(
          'Algo inesperado aconteceu, tente novamente em alguns minutos!'
        );
      }
    );
  }

  /**
   * Preenche o formulário do modal com o pagamento recebido
   * @param payment pagamento(tasks)
   */
  private fillPaymentForm(payment: Payment) {
    const date = FormatDate.formatStringToNgbDate(payment.date);
    this.newPaymentForm.patchValue({
      name: payment.name,
      value: payment.value,
      date: date,
      title: payment.title,
    });
  }

  private initModalConfig() {
    this.modalConfig = new ModalConfig();
    this.modalConfig.size = Size.MEDIUM;
    this.modalConfig.centered = true;
    this.modalConfig.scrollable = true;
  }
}
