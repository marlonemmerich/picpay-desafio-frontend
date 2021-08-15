import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro } from 'src/app/core/models/filtro.model';
import { Paginacao } from 'src/app/core/models/paginacao.model';
import { SortTableHeader } from 'src/app/core/models/sort-table-header.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PagamentosService {
  private readonly API_URL = 'http://localhost:3000/tasks';

  constructor(
    private apiService: ApiService
  ) { }


  getPagamentos(paginacao: Paginacao, filtro: Filtro, sort: SortTableHeader) {
    let params = {};

    params['_page'] = paginacao.paginaAtual;
    params['_limit'] = parseInt(paginacao.quantidadePorPagina)+1; // apenas para definir se possui próxima página

    if(!!filtro.valorBusca) {
      params[`${filtro.chaveBusca}_like`] =  `^.*${filtro.valorBusca}.*$`;
    }

    if(sort.sort) {
      params[`_sort`] =  sort.chaveCampo;
      params[`_order`] =  sort.sortOrdem;
    }

    let httpParams = new HttpParams({ fromObject: params });

    return this.apiService.get(this.API_URL, httpParams);
  }
}
