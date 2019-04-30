import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public text: string;
  public title: string;

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.text = data.text;
    this.title = data.title;
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
