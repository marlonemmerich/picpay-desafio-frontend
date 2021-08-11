import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilPageComponent } from './perfil-page.component';
import { PerfilPageRoutingModule } from './perfil-page-routing.module';



@NgModule({
  declarations: [
    PerfilPageComponent
  ],
  imports: [
    CommonModule,
    PerfilPageRoutingModule
  ]
})
export class PerfilPageModule { }
