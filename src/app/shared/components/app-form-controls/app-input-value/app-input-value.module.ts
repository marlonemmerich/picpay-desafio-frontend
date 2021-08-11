import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValueComponent } from './components/input-value/input-value.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInputMessageModule } from '../app-input-message/app-input-message.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [InputValueComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppInputMessageModule,
    CurrencyMaskModule
  ],
  exports: [InputValueComponent],
})
export class AppInputValueModule {}
