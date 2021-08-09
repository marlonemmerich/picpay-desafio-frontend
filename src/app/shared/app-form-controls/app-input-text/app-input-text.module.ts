import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextComponent } from './components/input-text/input-text.component';
import { AppInputMessageModule } from '../app-input-message/app-input-message.module';

@NgModule({
  declarations: [
    InputTextComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppInputMessageModule
  ],
  exports: [
    InputTextComponent
  ]
})
export class AppInputTextModule { }
