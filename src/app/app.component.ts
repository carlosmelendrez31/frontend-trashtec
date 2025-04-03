import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importar RouterOutlet
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,RouterOutlet,RouterModule
  ]
})
export class AppComponent {
  nombreusuario: string = '';

  constructor(private authService: AuthService) {
    this.authService.nombreusuario$.subscribe(nombre => {
      this.nombreusuario = nombre; // Se actualiza automáticamente en el navbar
    });
  }

  logout(): void {
    this.authService.logout();
  }
}




