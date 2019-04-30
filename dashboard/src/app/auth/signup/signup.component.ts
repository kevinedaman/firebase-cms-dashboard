import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

import { SignupFormComponent } from '../components/signup-form/signup-form.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form = SignupFormComponent.formModel();

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/', 'login']);
  }

  async register() {
    const { value } = this.form;

    const user = {
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      role: 'admin',
    };

    try {
      const auth = await this.authService.register(value.email, value.password);
      const uid = auth.user.uid;
      await this.authService.createUser(uid, user);
      this.router.navigate(['/']);
    } catch (error) {
      this.showErrorModal();
    }
  }

  showErrorModal() {
    const text = 'Check your information and try again';
    const title = 'Registration Error';
    this.alertService.error(text, title);
  }
}
