import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, CardModule],
  templateUrl: './home.component.html',
  styles: [`
    .container {
      max-width: 600px;
      margin: auto;
    }
    .card-title {
      font-size: 2.5rem;
    }
    .card-text {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }
    .mb-3 {
      margin-bottom: 1rem;
    }
    img {
      width: 100%;
      height: auto;
    }
  `]
})
export class HomeComponent {}
