import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '..//auth.service';

import { LoginFormComponent } from '../components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form = LoginFormComponent.formModel();

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signIn() {
    const { value } = this.form;
    this.authService.signIn(value.email, value.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.showErrorModal();
      });
  }

  signup() {
    this.router.navigate(['/', 'auth', 'signup']);
  }

  showErrorModal() {
    const text = 'Check your information and try again';
    const title = 'Login Error';
    this.alertService.error(text, title);
  }
}
