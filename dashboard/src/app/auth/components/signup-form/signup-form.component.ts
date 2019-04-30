import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  @Input() public form: FormGroup;

  static formModel() {
    return new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl(null, Validators.compose([
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ])),
      confirm: new FormControl(null, Validators.compose([
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ])),
    }, {
      validators: [this.validatePasswords],
    });
  }

  static validatePasswords(group: FormGroup) {
    const password = group.controls.password.value;
    const confirm = group.controls.confirm.value;
    return password === confirm ? null : { passwordMismatch: true };
  }
  constructor() { }

  ngOnInit() {
  }

}
