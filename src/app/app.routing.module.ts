import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/pagamentos-page/pagamentos-page.module').then((m) => m.PagamentosPageModule),
    },
    {
        path: 'pagamentos',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule),
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}