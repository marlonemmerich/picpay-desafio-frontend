import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    NgbAlertModule
  ],
  exports: [AlertComponent],
  providers: [NgbAlertConfig]
})
export class AppAlertModule { }
