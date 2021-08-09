import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppInputTextModule } from './app-input-text/app-input-text.module';
import { AppInputMessageModule } from './app-input-message/app-input-message.module';

@NgModule({
  exports: [
    CommonModule,
    AppInputTextModule,
    AppInputMessageModule
  ]
})
export class AppFormControlsModule { }
