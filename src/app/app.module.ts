import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './src/core/core.module';
import { SharedModule } from './src/shared/shared.module';
import { LoadingComponent } from './src/shared/components/loading/loading.component';
import { AuthModule } from './src/auth/auth.module';
import { PagamentosModule } from './src/pagamentos/pagamentos.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
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
