import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Esp32Service {
  private baseUrl = 'http://192.168.100.200';

  constructor(private http: HttpClient) {}

  obtenerLlenado(): Observable<number> {
    return this.http.get(`${this.baseUrl}/obtenerllenado`, { responseType: 'text' })
      .pipe(
        map(response => Number(response)) // 👈 aquí se convierte el texto a número
      );
  }

  activarServo(): Observable<string> {
    return this.http.get(`${this.baseUrl}/activar_servo`, { responseType: 'text' });
  }
}