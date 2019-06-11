import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public error(text, title) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '300px',
      data: { text, title },
    });
  }

  public confirm(text, title) {
    return this.dialog.open(AlertComponent, {
      width: '400px',
      data: { text, title },
    });
  }
}
