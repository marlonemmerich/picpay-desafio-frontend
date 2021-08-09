import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { HeaderModule } from './features/header/header.module';
@NgModule({
  declarations: [	
    AppComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HeaderModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
