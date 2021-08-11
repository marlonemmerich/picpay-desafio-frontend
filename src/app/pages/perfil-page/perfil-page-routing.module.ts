import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from 'src/app/core/guards/auth.guard'
import { PerfilPageComponent } from './perfil-page.component'

const routes: Routes = [
    { 
        path: '', 
        component: PerfilPageComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'PayFriends - Perfil',
            showHeader: true
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PerfilPageRoutingModule {}