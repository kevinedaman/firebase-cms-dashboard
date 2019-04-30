import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() accent = false;
  @Input() icon: string;
  @Input() disabled = false;
  @Output() handleClick: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
