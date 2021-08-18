import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { DetalhesPagamentoResolver } from './resolvers/detalhes-pagamento.resolver';
import { DetalhesPagamentoComponent } from './components/detalhes-pagamento/detalhes-pagamento.component';


const routes: Routes = [
  {
    path: 'pagamentos',
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pagamento/:id',
    component: DetalhesPagamentoComponent,
    canActivate: [AuthGuard],
    resolve: {
      pagamento: DetalhesPagamentoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagamentosRoutingModule {}
