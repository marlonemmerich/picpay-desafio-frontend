import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ModalConfig } from 'src/app/shared/interfaces/modal-config';
 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  private modalRef: NgbModalRef;
 
  @Input() modalConfig: ModalConfig;
 
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>;
 
  constructor(private modalService: NgbModal) {}
 
  public open() {
    this.modalRef = this.modalService.open(this.modalContent, {
      centered: this.modalConfig.centered,
      size: this.modalConfig.size,
      scrollable: this.modalConfig.scrollable,
    });
  }
 
  public close() {
    this.modalRef.close();
  }
 
  public dismiss() {
    this.modalRef.dismiss();
  }
}
 
 

