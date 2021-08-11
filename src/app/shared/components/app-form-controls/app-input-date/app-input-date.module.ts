import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { InputDateComponent } from './components/input-date/input-date.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInputMessageModule } from '../app-input-message/app-input-message.module';

@NgModule({
  declarations: [InputDateComponent],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    AppInputMessageModule,
  ],
  exports: [InputDateComponent],
})
export class AppInputDateModule {}
