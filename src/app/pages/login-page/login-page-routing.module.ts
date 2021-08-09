import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginPageComponent } from './login-page.component'
import { LoginPageGuard } from './login-page.guard'

const routes: Routes = [
    { 
        path: '', 
        component: LoginPageComponent,
        canActivate: [LoginPageGuard] 
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginPageRoutingModule {}