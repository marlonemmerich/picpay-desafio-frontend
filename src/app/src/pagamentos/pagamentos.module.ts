import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'pagamentos',
    component: ListComponent
  }
];

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class PagamentosModule { }
