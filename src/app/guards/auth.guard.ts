import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthGuards implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if(!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }

}
