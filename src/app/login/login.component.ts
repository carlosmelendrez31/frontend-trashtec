import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegura que FormsModule está importado
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Token recibido:', response.token);
        this.authService.setToken(response.token);
        
        // Redirigir al usuario a Home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error en login:', err);
      }
    });
  }
}






