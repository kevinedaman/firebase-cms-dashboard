import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';
import { LayoutComponent } from './layout/layout.component';
import { NavDrawerComponent } from './layout/nav-drawer/nav-drawer.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    AlertComponent,
    ButtonComponent,
    LayoutComponent,
    NavDrawerComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
  ]
})
export class SharedModule { }
