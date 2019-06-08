import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss']
})
export class NavDrawerComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/', 'login']);
  }

}
