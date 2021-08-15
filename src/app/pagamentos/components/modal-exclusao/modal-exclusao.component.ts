import { Component, Input, OnInit } from '@angular/core';
import MODAL_OPTIONS from 'src/app/shared/consts/modal.const';
import { ModalInterface } from 'src/app/shared/interfaces/modal-interface';
import * as M from 'materialize-css';
import Pagamento from '../../models/pagamento.model';

@Component({
  selector: 'app-modal-exclusao',
  templateUrl: './modal-exclusao.component.html',
  styleUrls: ['./modal-exclusao.component.scss']
})
export class ModalExclusaoComponent implements ModalInterface {
  private modalInstance;

  idModal = 'id-modal-exclusao-pagamento';

  constructor() { }

  show() {
    this.inicializarElementos();
    this.modalInstance.open();
  }

  hide() {
    this.modalInstance.close();
  }

  inicializarElementos() {
    var elementModal = document.getElementById(this.idModal);
    this.modalInstance = M.Modal.init(elementModal, MODAL_OPTIONS);
  }

}
