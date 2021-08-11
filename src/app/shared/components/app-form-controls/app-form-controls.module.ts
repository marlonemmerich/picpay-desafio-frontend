import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppInputTextModule } from './app-input-text/app-input-text.module';
import { AppInputMessageModule } from './app-input-message/app-input-message.module';
import { AppInputValueModule } from './app-input-value/app-input-value.module';
import { AppInputDateModule } from './app-input-date/app-input-date.module';

@NgModule({
  exports: [
    CommonModule,
    AppInputTextModule,
    AppInputMessageModule,
    AppInputValueModule,
    AppInputDateModule,
  ]
})
export class AppFormControlsModule { }
