import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagamentosService } from 'src/app/pagamentos/services/pagamentos.service';

@Injectable({
  providedIn: 'root'
})
export class DetalhesPagamentoResolver implements Resolve<boolean> {
  constructor(
    private pagamentoService: PagamentosService,
    private router: Router
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.pagamentoService.getPagamento(route.params.id)
      .pipe(catchError((err) => this.router.navigateByUrl('/pagamentos')));
  }
}


