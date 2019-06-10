import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss']
})
export class CreatePostFormComponent implements OnInit {
  @Input() form: FormGroup;

  editorConfig = {
    height: 500,
  };

  constructor() { }

  static formModel(values = null) {
    return new FormGroup({
      title: new FormControl(values && values.title || ''),
      content: new FormControl(values && values.content || ''),
    });
  }

  ngOnInit() {
  }

}
