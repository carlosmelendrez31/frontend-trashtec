import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';  // Asegúrate de tener el componente Home
import { LoginComponent } from './login/login.component';  // Componente de login
import { RegistroComponent } from './registro/registro.component';
import { ActualizarDatosComponent } from './actualizar-datos/actualizar-datos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { AyudaComponent } from './ayuda/ayuda.component';

export const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'actualizar-datos', component: ActualizarDatosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'ayuda', component: AyudaComponent }  // <-- Esta es la nueva ruta
];

  

