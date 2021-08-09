import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from 'src/app/core/guards/auth.guard'

import { PagamentosPageComponent } from './pagamentos-page.component'

const routes: Routes = [
    { 
        path: '', 
        component: PagamentosPageComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'PayFriends - Pagamentos',
            showHeader: true
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagamentosPageRoutingModule {}