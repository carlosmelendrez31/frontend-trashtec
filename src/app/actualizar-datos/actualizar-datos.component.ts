import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioservicesService } from '../services/Usuarioservice/usuarioservices.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-datos',
  standalone: true,
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.css'],
  
  imports: [ReactiveFormsModule,CommonModule]
})
export class ActualizarDatosComponent {
  form: FormGroup;
  private usuarioService = inject(UsuarioservicesService);
  private router = inject(Router);
  private usuarioId = 0; // ID del usuario logueado

  constructor(private fb: FormBuilder) {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.usuarioId = usuario.id; // Asegúrate de que tu API devuelve el ID del usuario

    this.form = this.fb.group({
      nombreusuario: [usuario.nombreusuario || '', Validators.required],
      email: [usuario.email || '', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
    this.usuarioId = Number(localStorage.getItem('idUsuario')) || 0;
console.log("📌 ID del usuario en localStorage:", this.usuarioId);
  }

  // Método para actualizar el usuario
  actualizar() {
    if (this.form.valid) {
      this.usuarioService.actualizarUsuario(this.usuarioId, this.form.value)
        .subscribe({
          next: (res) => {
            console.log('Usuario actualizado:', res);
            alert('Datos actualizados correctamente');
            this.router.navigate(['/']); // Redirige al usuario después de actualizar
          },
          error: (err) => {
            console.error('Error al actualizar usuario:', err);
            alert('Error al actualizar los datos');
          }
        });
    } else {
      alert('Por favor, completa todos los campos del formulario.');
    }
  }
}
