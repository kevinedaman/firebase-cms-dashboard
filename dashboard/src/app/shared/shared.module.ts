import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [
    AlertComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    AlertComponent,
    ButtonComponent,
  ],
  entryComponents: [
    AlertComponent,
  ]
})
export class SharedModule { }
