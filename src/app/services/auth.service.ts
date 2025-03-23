import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7196/api/auth/login'; // Reemplaza con la URL real de tu API

  private nombreusuarioSubject = new BehaviorSubject<string>(this.getNombreUsuario());
  nombreusuario$ = this.nombreusuarioSubject.asObservable(); // Observable para el navbar

  constructor(private http: HttpClient) {}

  login(email: string, contrasena: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { email, contrasena }).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    
    // Decodificar el token para obtener el nombre de usuario
    
    const decodedToken: any = jwtDecode(token);
    const nombreusuario = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || '';

    localStorage.setItem('nombreusuario', nombreusuario);
    this.nombreusuarioSubject.next(nombreusuario); // Notificar el cambio
  }

  getNombreUsuario(): string {
    return localStorage.getItem('nombreUsuario') ?? '';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  logout(): void {
    localStorage.clear();
    this.nombreusuarioSubject.next(''); // Notificar que ya no hay usuario logueado
  }
}

