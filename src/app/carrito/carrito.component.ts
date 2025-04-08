import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Esp32Service } from '../services/esp32/esp32.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  porcentaje: number = 0;
  color: string = 'gray';

  constructor(private esp32Service: Esp32Service) {}

  ngOnInit() {
    this.obtenerLlenado();
    setInterval(() => this.obtenerLlenado(), 3000); // actualiza cada 3s
  }

  obtenerLlenado() {
    this.esp32Service.obtenerLlenado().subscribe(data => {
      this.porcentaje = data;
      this.setColor(data);
    });
  }

  activarServo() {
    this.esp32Service.activarServo().subscribe(res => {
      console.log('✅ Servo activado:', res);
    });
  }

  setColor(porcentaje: number) {
    if (porcentaje <= 50) {
      this.color = 'green';
    } else if (porcentaje <= 80) {
      this.color = 'orange';
    } else {
      this.color = 'red';
    }
  }
}
