import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    HomeComponent,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  usuarioForm: FormGroup;
  apiUrl = 'https://localhost:7196/api/Usuarios/agregar'; // Ajusta la URL a tu API

  constructor() {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dispositivo_id: [''] // Opcional
    });
  }

  registrarUsuario() {
    if (this.usuarioForm.valid) {
      this.http.post(this.apiUrl, this.usuarioForm.value).subscribe({
        next: () => this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario registrado correctamente' }),
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el usuario' })
      });
    }
  }
}


