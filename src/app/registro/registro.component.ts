import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistroService } from '../services/registro.service';
import { Router } from '@angular/router'; // Importa el Router
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  mensaje: string = '';
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(private fb: FormBuilder, 
              private registroService: RegistroService, 
              private router: Router) {  // Inyecta el Router aquí
    this.registroForm = this.fb.group({
      nombreusuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  registrar() {
    if (this.registroForm.valid) {
      this.registroService.registrarUsuario(this.registroForm.value).subscribe({
        next: (res) => {
          console.log('Respuesta del backend:', res);
          this.mensaje = res.mensaje;
          
          setTimeout(() => {
            console.log('Redirigiendo a /login...');
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: () => {
          this.mensaje = 'Error al registrar usuario';
        }
      });
    }
  }
  
  
}


  
