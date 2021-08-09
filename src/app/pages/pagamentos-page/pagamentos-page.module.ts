import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentosPageRoutingModule } from './pagamentos-page-routing.module';
import { PagamentosPageComponent } from './pagamentos-page.component';

@NgModule({
  declarations: [PagamentosPageComponent],
  imports: [
    CommonModule,
    PagamentosPageRoutingModule
  ]
})
export class PagamentosPageModule { }
