import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './src/core/core.module';
import { SharedModule } from './src/shared/shared.module';
import { AuthModule } from './src/auth/auth.module';
import { ItensModule } from './src/itens/itens.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [	
    AppComponent,

   ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
    ItensModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
