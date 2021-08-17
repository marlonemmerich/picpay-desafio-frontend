import { Component, Input, OnInit } from '@angular/core';
import MODAL_OPTIONS from 'src/app/shared/consts/modal.const';
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
export class ModalExclusaoComponent {
  private modalInstance;

  idModal = 'id-modal-exclusao-pagamento';
  pagamentoExclusao: Pagamento = new Pagamento();
  constructor(
    private loadingService: LoadingService,
    private modalExlusaoService: ModalExclusaoService,
    private pagamentoService: PagamentosService
  ) { }

  abrir(pagamento: Pagamento) {
    this.pagamentoExclusao = Object.assign(this.pagamentoExclusao, pagamento);
    this.inicializarElementos();
    this.modalInstance.open();
  }

  fechar() {
    this.modalInstance.close();
  }

  inicializarElementos() {
    const elementModal = document.getElementById(this.idModal);
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
          const parametros = {
            sucesso: true,
            objeto: this.pagamentoExclusao
          };
          this.modalExlusaoService.atualizarStatusExclusao(parametros);
          this.fechar();
          M.toast({html: 'Pagamento removido com sucesso!', displayLength: 3000, classes: 'green'});
        },
        error: error => {
          const mensagemDefault = 'Houve um erro ao tentar excluir o pagamento';
          M.toast({html: (error && error.mensagem) ? error.mensagem : mensagemDefault, displayLength: 3000, classes: 'red'});
        },
    });
  }

}
