import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { AuthModule } from './auth/auth.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HeaderComponent,
   ],
  imports: [
    SharedModule,
    BrowserModule,
    CoreModule,
    AuthModule,
    PagamentosModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
