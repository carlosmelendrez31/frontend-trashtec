import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-registro',
    standalone : true,
  imports: [CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombreusuario : string = "";
  email : string = "";
  contrasena : string = "";
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
