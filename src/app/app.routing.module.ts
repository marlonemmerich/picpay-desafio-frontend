import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { Rotas } from './shared/utils/rotas'

const routes: Routes = [
    {
        path: '',
        redirectTo: Rotas.PAGAMENTOS,
        pathMatch: 'full',
    },
    {
        path: Rotas.PAGAMENTOS,
        loadChildren: () => import('./pages/pagamentos-page/pagamentos-page.module').then((m) => m.PagamentosPageModule)
    },
    {
        path: Rotas.LOGIN,
        loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule),
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}