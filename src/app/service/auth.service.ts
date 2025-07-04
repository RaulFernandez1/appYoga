import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '../entities/user';
import { BACKEND_URI } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private httpClient: HttpClient) { }
   
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(usuario: User): Observable<UserResponse> {
    this.loggedIn = true;
    console.log('Estado del flag: '+this.isLoggedIn());
    return this.httpClient.post<UserResponse>(BACKEND_URI + '/api/auth/signin', usuario);
  }

  logout(): void {
    this.loggedIn = false;
    console.log('Estado del flag: '+this.isLoggedIn());
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('alumnoid')
  }

}
