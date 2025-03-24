import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioservicesService {
  //private apiUrl = 'https://localhost:7196/api/Usuarios'; // Cambia esto a tu URL base

  constructor(private http: HttpClient) {}

  // Método para actualizar el usuario
  actualizarUsuario(id: number, usuario: any): Observable<any> {
    const url = `https://localhost:7196/api/Usuarios/${id}`;
    console.log("URL de la petición PUT:", url); // 👀 Verifica en consola
    return this.http.put(url, usuario);
  }
}
