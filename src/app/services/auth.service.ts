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
    
    // Decodificar el token para obtener el ID del usuario
    const decodedToken: any = jwtDecode(token);
  
    console.log("📌 Token decodificado:", decodedToken); // 👀 Verificar datos en consola
  
    const idUsuario = decodedToken["id"] || decodedToken["sub"]; // ✅ Usar `id` o `sub`
    const nombreusuario = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || '';
  
    console.log("📌 ID del usuario extraído:", idUsuario); // 👀 Verificar si se obtiene bien
  
    if (idUsuario) {
      localStorage.setItem('idUsuario', idUsuario);
    } else {
      console.error("❌ Error: No se pudo extraer `idUsuario` del token.");
    }
  
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

  getUserData(): any {
    const token = this.getToken();
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del JWT
  }
}

