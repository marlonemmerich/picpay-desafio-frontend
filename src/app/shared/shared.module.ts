import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFormControlsModule } from './app-form-controls/app-form-controls.module';
import { AppButtonModule } from './app-button/app-button.module';
import { AppModalModule } from './app-modal/app-modal.module';
import { AppProfileModule } from './app-profile/app-profile.module';
import { AppSearchModule } from './app-search/app-search.module';
import { AppTableModule } from './app-table/app-table.module';
import { AppAlertModule } from './app-alert/app-alert.module';

@NgModule({
  exports: [
    CommonModule,
    AppFormControlsModule,
    AppButtonModule,
    AppModalModule,
    AppProfileModule,
    AppSearchModule,
    AppTableModule,
    AppAlertModule
  ]
})
export class SharedModule { }
