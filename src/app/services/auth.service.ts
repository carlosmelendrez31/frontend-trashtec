import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://tu-api.com/auth/login'; // Reemplaza con la URL real de tu API

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  // Método para guardar el token y extraer el nombre de usuario
  setToken(token: string): void {
    localStorage.setItem('token', token);

    // Decodificar el token y extraer el nombre de usuario
    const decodedToken: any = jwtDecode(token);
    const nombreUsuario = decodedToken.nombreUsuario; // Asegúrate de que el token lo incluya

    localStorage.setItem('nombreUsuario', nombreUsuario);
  }

  // Obtener el nombre de usuario desde localStorage
  getNombreUsuario(): string {
    return localStorage.getItem('nombreUsuario') ?? '';
  }

  // Obtener el token almacenado
  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.clear();
  }
}

