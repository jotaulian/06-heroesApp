import { Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({providedIn: 'root'})
export class PublicGuard {

  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean>{
    return this.authService.checkAuthStatus()
    .pipe(
      tap(isAuthenticated =>console.log('Authenticated:', isAuthenticated)),
      tap(isAuthenticated => {
        if(isAuthenticated) {
          this.router.navigate(['./'])
        }
      }),
      // Si 'isAuthenticated' es false, devolvemos un 'true' para que pase el guard.
      map(isAuthenticated => !isAuthenticated)
    );
  }

  public canMatch: CanMatchFn = (route, segments) => {
    // console.log('canMatch', { route, segments });
    // return true;

    return this.checkAuthStatus();
  };

  public canActivate: CanActivateFn = (route, state) => {
    // console.log('canActivate', { route, state });
    // return true;

    return this.checkAuthStatus();
  };

}
