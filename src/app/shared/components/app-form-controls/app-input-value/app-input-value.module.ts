import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValueComponent } from './components/input-value/input-value.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInputMessageModule } from '../app-input-message/app-input-message.module';

@NgModule({
  declarations: [InputValueComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppInputMessageModule
  ],
  exports: [InputValueComponent],
})
export class AppInputValueModule {}
