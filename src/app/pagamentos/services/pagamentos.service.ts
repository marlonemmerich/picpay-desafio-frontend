import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro } from 'src/app/core/models/filtro.model';
import { Paginacao } from 'src/app/core/models/paginacao.model';
import { SortTableHeader } from 'src/app/core/models/sort-table-header.model';
import { ApiService } from 'src/app/shared/services/api.service';
import Pagamento from '../models/pagamento.model';

@Injectable({
  providedIn: 'root'
})
export class PagamentosService {
  private readonly API_URL = 'http://localhost:3000/tasks';

  constructor(
    private apiService: ApiService
  ) { }


  getPagamentos(paginacao: Paginacao, filtro: Filtro, sort: SortTableHeader) {
    const params = {
      _start: undefined,
      _limit: undefined,
      _sort: undefined,
      _order: undefined,
    };
    const intQuantidadePorPagina = parseInt(paginacao.quantidadePorPagina, 10);
    const paginaAtual = paginacao.paginaAtual;

    params._start = paginaAtual === 1 ? 0 : (paginaAtual * intQuantidadePorPagina) - intQuantidadePorPagina;
    params._limit = intQuantidadePorPagina + 1;
    /* Linha acima apenas para definir se
       possui próxima página (backend não
       retornou o header com "X-Total-Count" =\)
    */

    if (!!filtro.valorBusca) {
      params[`${filtro.chaveBusca}_like`] =  `^.*${filtro.valorBusca}.*$`;
    }

    if (sort.sort) {
      params._sort =  sort.chaveCampo;
      params._order =  sort.sortOrdem;
    }

    const httpParams = new HttpParams({ fromObject: params });

    return this.apiService.get(this.API_URL, httpParams);
  }

  removerPagamento(pagamento: Pagamento) {
    return this.apiService.delete(`${this.API_URL}/${pagamento.id}`);
  }

  cadastrarPagamento(pagamento: Pagamento) {
    return this.apiService.post(this.API_URL, pagamento);
  }

  editarPagamento(id: string | number, pagamento: Pagamento) {
    return this.apiService.put(`${this.API_URL}/${id}`, pagamento);
  }

}
