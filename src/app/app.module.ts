import { NgModule } from '@angular/core';
import ptBr from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { AuthModule } from './auth/auth.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HeaderComponent,
   ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CoreModule,
    AuthModule,
    PagamentosModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
