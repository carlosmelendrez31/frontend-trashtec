import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';  // Asegúrate de tener el componente Home
import { LoginComponent } from './login/login.component';  // Componente de login
import { RegistroComponent } from './registro/registro.component';
import { ActualizarDatosComponent } from './actualizar-datos/actualizar-datos.component';
import { CarritoComponent } from './carrito/carrito.component';

export const routes: Route[] = [
 // { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirige a login si no está autenticado
  //{ path: 'login', component: LoginComponent }, // Ruta de login
  { path: '', component: HomeComponent }, // Ruta por defecto al Login
  { path: 'home', component: HomeComponent }, // Ruta de home
  {path:'registro',component:RegistroComponent},
  {path:'login',component:LoginComponent},
  { path: 'actualizar-datos', component: ActualizarDatosComponent },
  {path : 'carrito', component : CarritoComponent}

  // otras rutas...
];

  

