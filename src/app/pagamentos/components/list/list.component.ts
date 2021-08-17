import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { finalize, map } from 'rxjs/operators';
import { SortOrdem } from 'src/app/core/enums/sort-ordem';
import { RetornoModal } from 'src/app/core/interfaces/retorno-modal';
import { Filtro } from 'src/app/core/models/filtro.model';
import { Paginacao } from 'src/app/core/models/paginacao.model';
import { SortTableHeader } from 'src/app/core/models/sort-table-header.model';

import { LoadingService } from 'src/app/shared/service/loading.service';
import Pagamento from '../../models/pagamento.model';
import { ModalExclusaoService } from '../../services/modal-exclusao.service';
import { ModalPagamentoService } from '../../services/modal-pagamento.service';
import { PagamentosService } from '../../services/pagamentos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pagamentosList: Array<Pagamento> = [];
  paginacao: Paginacao = new Paginacao();
  filtro: Filtro = new Filtro({
    chaveBusca: 'name',
    valorBusca: '',
  });

  sortTableHeaders: Array<SortTableHeader> = [
    new SortTableHeader({
      textoCampo: 'Usuário',
      chaveCampo: 'name'
    }),
    new SortTableHeader({
      textoCampo: 'Título',
      chaveCampo: 'title'
    }),
    new SortTableHeader({
      textoCampo: 'Data',
      chaveCampo: 'date'
    }),
    new SortTableHeader({
      textoCampo: 'Valor',
      chaveCampo: 'value'
    }),
    new SortTableHeader({
      textoCampo: 'Pago',
      chaveCampo: 'isPayed'
    }),
  ];

  sortTableHeadersSelecionado = new SortTableHeader({});

  constructor(
    private pagamentosService: PagamentosService,
    private loadingService: LoadingService,
    private modalExclusaoService: ModalExclusaoService,
    private modalExclusaoPagamento: ModalPagamentoService
  ) { }

  ngOnInit(): void {
    this.obterPagamentos();
    this.montarElemenetosMaterialize();

    /* observando a modal de exclusão */
    this.modalExclusaoService.statusExclusao.subscribe((retorno: RetornoModal) => {
      if (retorno.sucesso) {
        this.obterPagamentosResetandoPagina();
      }
    });

    /* observando a modal de pagamento */
    this.modalExclusaoService.statusExclusao.subscribe((retorno: RetornoModal) => {
      if (retorno.sucesso) {
        this.obterPagamentosResetandoPagina();
      }
    });
  }

  montarElemenetosMaterialize() {
    setTimeout(() => {
      M.FormSelect.init(document.querySelectorAll('select'));
    }, 50);
  }

  obterPagamentos() {
    this.pagamentosList = [];
    this.loadingService.exibir();

    this.pagamentosService.getPagamentos(this.paginacao, this.filtro, this.sortTableHeadersSelecionado)
      .pipe(
        finalize(() => {
          this.loadingService.esconder();
        })
      )
      .subscribe({
        next: (pagamentos: Array<any>) => {
          this.paginacao.possuiProximaPagina = false;
          let count = 1;
          pagamentos.forEach((pagamento: any) => {
            if (count <= parseInt(this.paginacao.quantidadePorPagina, 10)) {
              this.pagamentosList.push(Object.assign(new Pagamento(), pagamento));
            } else {
              this.paginacao.possuiProximaPagina = true;
            }
            count++;
          });
        },
        error: error => {
          const mensagemDefault = 'Houve um erro  desconhecido ao obter os pagamentos';
          M.toast({html: (error && error.mensagem) ? error.mensagem : mensagemDefault, displayLength: 3000, classes: 'red'});
        },
      });
  }

  obterPagamentosPaginaAnterior(pagina: number) {
    if (!pagina) {
      return;
    }
    this.obterPagamentosPaginacao(pagina);
  }

  obterPagamentosPaginacaoPosterior(pagina: number, possuiProximaPagina: boolean) {
    if (!possuiProximaPagina) {
      return;
    }
    this.obterPagamentosPaginacao(pagina);
  }

  obterPagamentosPaginacao(pagina: number) {
    this.paginacao.paginaAtual = pagina;
    this.obterPagamentos();
  }

  obterPagamentosResetandoPagina() {
    this.paginacao.paginaAtual = 1;
    this.obterPagamentos();
  }

  selecionarSortAsc(sort: SortTableHeader) {
    this.selecionarSort(sort, SortOrdem.asc);
  }

  selecionarSortDesc(sort: SortTableHeader) {
    this.selecionarSort(sort, SortOrdem.desc);
  }

  selecionarSort(sort: SortTableHeader, novaSituacao: SortOrdem) {
    if (sort.isSorting && sort.sortOrdem === novaSituacao) {
      return;
    }
    const statusSortOrdemAnterior = sort.sortOrdem;
    const statusSortAnterior = sort.isSorting;
    this.sortTableHeaders.forEach((sortHeader) => {
      sortHeader.resetSortStatus();
    });
    sort.setSortStatus(statusSortOrdemAnterior, statusSortAnterior, novaSituacao);
    this.sortTableHeadersSelecionado = sort;
    this.obterPagamentosResetandoPagina();
  }

}
