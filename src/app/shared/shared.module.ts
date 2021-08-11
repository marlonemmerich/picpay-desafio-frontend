import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFormControlsModule } from './components/app-form-controls/app-form-controls.module';
import { AppButtonModule } from './components/app-button/app-button.module';
import { AppModalModule } from './components/app-modal/app-modal.module';
import { AppProfileModule } from './components/app-profile/app-profile.module';
import { AppSearchModule } from './components/app-search/app-search.module';
import { AppTableModule } from './components/app-table/app-table.module';
import { AppAlertModule } from './components/app-alert/app-alert.module';
import { FilterByUser } from './pipes/filter-by-user.pipe';

@NgModule({
  declarations: [
    FilterByUser
],
  exports: [
    CommonModule,
    AppFormControlsModule,
    AppButtonModule,
    AppModalModule,
    AppProfileModule,
    AppSearchModule,
    AppTableModule,
    AppAlertModule,
    FilterByUser
  ]
})
export class SharedModule { }
