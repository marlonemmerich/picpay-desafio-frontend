import { Component } from '@angular/core';
import { ModalInterface } from 'src/app/shared/interfaces/modal-interface';
import * as M from 'materialize-css';
import DATEPICK_OPTIONS from '../../../shared/consts/datepick.const';
import TIMEPICK_OPTIONS from '../../../shared/consts/timepick.const';
import MODAL_OPTIONS from '../../../shared/consts/modal.const';

@Component({
  selector: 'app-modal-pagamento',
  templateUrl: './modal-pagamento.component.html',
  styleUrls: ['./modal-pagamento.component.scss']
})
export class ModalPagamentoComponent implements ModalInterface {
  private modalInstance;
  private datePickInstance;
  private timePickInstance;

  idModal = 'id-modal-pagamento';
  idDatePick = 'id-modal-pagamento-datepick-data';
  idTimePick = 'id-modal-pagamento-datepick-hora';

  constructor() { }

  show() {
    this.inicializarInputs();
    this.modalInstance.open();
  }

  hide() {
    this.modalInstance.close();
  }

  inicializarInputs() {
    var elementModal = document.getElementById(this.idModal);
    console.log('elems', elementModal);
    this.modalInstance = M.Modal.init(elementModal, MODAL_OPTIONS);

    var elementDatePick = document.getElementById(this.idDatePick);
    this.datePickInstance = M.Datepicker.init(elementDatePick, DATEPICK_OPTIONS);

    var elementTimePick = document.getElementById(this.idTimePick);
    this.timePickInstance = M.Timepicker.init(elementTimePick, TIMEPICK_OPTIONS);
  }
}
