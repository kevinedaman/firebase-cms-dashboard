import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';


import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.authenticated) {
      return true;
    }
    return this.auth.currentAuthStateObservable
      .pipe(
        take(1),
        map(user => !!user),
        tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      }));
  }

  canLoad(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.currentAuthStateObservable
      .pipe(
        take(1),
        map(user => !!user),
        tap(authorized => {
        if (!authorized) {
          this.router.navigate(['/']);
        }
      }));
  }
}

