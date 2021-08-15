import { Component, Input, OnInit } from '@angular/core';
import MODAL_OPTIONS from 'src/app/shared/consts/modal.const';
import { ModalInterface } from 'src/app/shared/interfaces/modal-interface';
import * as M from 'materialize-css';
import Pagamento from '../../models/pagamento.model';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ModalExclusaoService } from '../../services/modal-exclusao.service';
import { PagamentosService } from '../../services/pagamentos.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-modal-exclusao',
  templateUrl: './modal-exclusao.component.html',
  styleUrls: ['./modal-exclusao.component.scss']
})
export class ModalExclusaoComponent implements ModalInterface {
  private modalInstance;

  idModal = 'id-modal-exclusao-pagamento';
  pagamentoExclusao: Pagamento = new Pagamento();
  constructor(
    private loadingService: LoadingService,
    private modalExlusaoService: ModalExclusaoService,
    private pagamentoService: PagamentosService
  ) { }

  show(pagamento: Pagamento) {
    this.pagamentoExclusao = Object.assign(this.pagamentoExclusao, pagamento);
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

  confirmarExclusao() {
    this.loadingService.exibir();

    this.pagamentoService.removerPagamento(this.pagamentoExclusao)
      .pipe(
        finalize(() => {
          this.loadingService.esconder();
        })
      )
      .subscribe({
        next: () => {
          let parametros = {
            sucesso: true,
            objeto: this.pagamentoExclusao
          }
          this.modalExlusaoService.atualizarStatusExclusao(parametros);
          this.hide();
          M.toast({html: 'Pagamento removido com sucesso!', displayLength: 3000, classes: 'green'});
        },
        error: error => {
          M.toast({html: (error && error.mensagem) ? error.mensagem : 'Houve um erro ao tentar excluir o pagamento', displayLength: 3000, classes: 'red'});
        },
    });
  }

}
