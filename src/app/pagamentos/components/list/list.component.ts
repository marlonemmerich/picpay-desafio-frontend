import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { finalize } from 'rxjs/operators';
import { SortOrdem } from 'src/app/core/enums/sort-ordem';
import { Filtro } from 'src/app/core/models/filtro.model';
import { Paginacao } from 'src/app/core/models/paginacao.model';
import { SortTableHeader } from 'src/app/core/models/sort-table-header.model';

import { LoadingService } from 'src/app/shared/service/loading.service';
import Pagamento from '../../models/pagamento.model';
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
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.obterPagamentos();
    this.montarElemenetosMaterialize();
  }

  montarElemenetosMaterialize() {
    setTimeout(() => {
      M.FormSelect.init(document.querySelectorAll('select'));
    }, 50)
  }

  obterPagamentos() {
    this.pagamentosList = [];
    console.log(this.pagamentosList)
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
            if(count <= parseInt(this.paginacao.quantidadePorPagina)) {
              this.pagamentosList.push(Object.assign(new Pagamento(), pagamento));
            } else {
              this.paginacao.possuiProximaPagina = true;
            }
            count++;
          });
          console.log(this.pagamentosList)
        },
        error: error => {
          M.toast({html: (error && error.mensagem) ? error.mensagem : 'Houve um erro  desconhecido ao obter os pagamentos', displayLength: 3000, classes: 'red'});
        },
      });
  }

  obterPagamentosQuantidadeAlterada() {
    this.paginacao.paginaAtual = 1;
    this.obterPagamentos();
  }

  obterPagamentosPaginacao(pagina: number) {
    this.paginacao.paginaAtual = pagina;
    this.obterPagamentos();
  }

  obterPagamentosFiltro() {
    this.paginacao.paginaAtual = 1;
    this.obterPagamentos();
  }

  obterPagamentosResetado() {
    this.paginacao.paginaAtual = 1;
    this.obterPagamentos();
  }

  selecionarSortAsc(sort: SortTableHeader) {
    console.log(sort);
    this.selecionarSort(sort, SortOrdem.asc);
  }

  selecionarSortDesc(sort: SortTableHeader) {
    console.log(sort);
    this.selecionarSort(sort, SortOrdem.desc);
  }

  selecionarSort(sort: SortTableHeader, novaSituacao: SortOrdem) {
    if(sort.sort && sort.sortOrdem === novaSituacao) {
      return;
    }
    let statusSortOrdemAnterior = sort.sortOrdem;
    let statusSortAnterior = sort.sort;
    this.sortTableHeaders.forEach((sortHeader) => {
      sortHeader.resetSortStatus();
    });
    sort.setSortStatus(statusSortOrdemAnterior, statusSortAnterior);
    this.sortTableHeadersSelecionado = sort;
    this.obterPagamentosResetado();
  }

}
