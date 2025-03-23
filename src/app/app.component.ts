import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { ActualizarDatosComponent } from './actualizar-datos/actualizar-datos.component';

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
    ToastModule,
    RegistroComponent,
    ActualizarDatosComponent
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  get nombreUsuario(): string | null {
    return this.authService.getNombreUsuario();
  }

  logout() {
    this.authService.logout();
  }
}


