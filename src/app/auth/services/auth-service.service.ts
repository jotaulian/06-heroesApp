import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User|undefined{
    if(!this.user) return undefined;

    return structuredClone(this.user);
  }

  login(email: string, password :string): Observable<User>{

    // En la realidad: http.post('login',{email, password});
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token','kJoni4f5qd.uid4q4sqm4.adad8'))
      )
  }

checkAuthStatus(): Observable<boolean> {
  if(!localStorage.getItem('token')) return of(false);

  const token = localStorage.getItem('token');
  return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user = user),
      // Convertimos el usuario en un valor booleano. Si 'user' es null o undefined, el primer "!" lo convierte en 'true',
      // y el segundo "!" lo vuelve 'false'. Si 'user' tiene valor, el resultado será 'true'.
      map(user => !!user),
      catchError(error => of(false))
    );
}

  logout(){
    this.user = undefined;
    localStorage.removeItem('token');
  }

}
