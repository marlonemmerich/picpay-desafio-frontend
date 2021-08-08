import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PagamentosPageComponent } from './pagamentos-page.component'

const routes: Routes = [{ path: '', component: PagamentosPageComponent }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagamentosPageRoutingModule {}