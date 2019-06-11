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
  public single = false;

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.text = data.text;
    this.title = data.title;
    this.single = data.single;
  }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
