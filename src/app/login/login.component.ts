import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  

  login() {
    this.authService.login(this.email, this.contrasena).subscribe({
      next: (response) => {
        console.log('Token recibido:', response.token);
        this.authService.setToken(response.token);

        // Redirigir al usuario a la página principal
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = 'Credenciales incorrectas. Inténtelo de nuevo.';
      }
    });
  }

  

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
}








